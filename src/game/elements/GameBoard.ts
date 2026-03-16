/*Problem 9: 

9.1 Create a class named GameBoard that will represent 
the game board.
Its rows start start at top of the board with row 0
Its columns start at left side of the board with column 0
It will contain a 2D array of BoardSquare objects. 

This class has the following members:

- member field to represent number of rows on the board
- member field to represent number of columns on the board
   (rows start at top of board with row 0 - 
    columns start at left side of board with column 0)
- member field to represent all the spaces on the board – 
    this should be a 2 dimensional array of BoardSquare objects
- constructor with two parameters in this order:
    - number of rows
    - number of columns 
    - this constructor should set these member fields
     and set the 2D array member field to an empty array 

9.2 Accessors methods:
    - getNumRows, getNumColumns, getAllSquares

9.3 Accessor method: 
    - getSquare that has one parameter of type BoardLocation and returns
    the BoardSquare at that location's row and column

9.4 A method named inBounds has one parameter of type BoardLocation
    representing the location of a square on the game board 
    and returns a boolean value representing whether 
    the location of this space is within the bounds of the board 
    (For example:  inBounds( new BoardLocation (3,5)) should return false 
    for any board with less 4 rows or less than 6 columns)

9.5 A private method named setUpEmptyBoard with no parameters and no return value
    - This method creates a BoardSquare object for each location 
    in the 2 dimensional array of BoardSquares.  
    Use nested loops! You should alternate colors between black and white.
    You should start the color of the boardsquare at
    row 0 and col 0 to black and then row 0 col 1 to white.
    NOTE: after completing this method - add a statement to your 
    constructor to call this setUpEmptyBoard method
    After you have done this - see the bottom of the file for code
    that will create a GameBoard and display the colors so you can
    debug.
    HINT: All even rows will start with black and 
    all odd rows will start with white

9.6 A method named isBoardFull that has no parameters and returns a boolean
    representing whether there are no empty squares on the board
    NOTE: This is SIMILAR logic to the Week 2 - In Class Activity function boardFull

9.7 A method named findRandomEmptySquare with no parameters and 
   returns a BoardSquare. This method should call 
   getRandomInt() method (already written for you)
   to generate random row and column indexes
   if this location on the Board is empty – it should return this BoardSquare,
   if not, it should repeat the process until it finds an empty space. 
   NOTE: This is SIMILAR logic to the Week 2 - In Class Activity function
   placeOnEmptySpot 

9.8 A method toString is already defined for you

*/
import { BoardSquare } from "./BoardSquare";
import { BoardLocation } from "./BoardLocation";

export class GameBoard {
    private numRows: number;

    private numCols: number;

    private squares: BoardSquare[][];

    constructor(numRows: number, numCols: number) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.squares = [];
        this.setUpEmptyBoard();
    }

    getNumRows(): number {
        return this.numRows;
    }

    getNumColumns(): number {
        return this.numCols;
    }

    getAllSquares(): BoardSquare[][] {
        return this.squares;
    }

    getSquare(location: BoardLocation): BoardSquare {
        if (this.inBounds(location)) {
            return this.squares[location.getRow()][location.getCol()];
        } else {
            return new BoardSquare("");
        }
    }

    //NEW SPECIAL SQUARE
    pithole(random_row: number, random_col: number): void {
        if (this.squares[random_row][random_col].getPiece() != null) {
            this.squares[random_row][random_col].getPiece()?.setActive(false);
        }
    }
    inBounds(location: BoardLocation): boolean {
        return (
            location.getRow() >= 0 &&
            location.getRow() < this.numRows &&
            location.getCol() >= 0 &&
            location.getCol() < this.numCols
        );
    }

    private setUpEmptyBoard(): void {
        let row: number = 0;
        while (row < this.numRows) {
            this.squares[row] = [];
            let col: number = 0;
            while (col < this.numCols) {
                let color: string;

                // Even rows start with black, odd rows start with white
                if (row % 2 === 0) {
                    color = col % 2 === 0 ? "black" : "white";
                } else {
                    color = col % 2 === 0 ? "white" : "black";
                }

                this.squares[row][col] = new BoardSquare(color);
                col++;
            }
            row++;
        }
    }

    isBoardFull(): boolean {
        let row: number = 0;
        while (row < this.numRows) {
            let col: number = 0;
            while (col < this.numCols) {
                if (this.squares[row][col].isEmpty()) {
                    return false;
                }
                col++;
            }
            row++;
        }
        return true;
    }

    findRandomEmptySquare(): BoardSquare {
        let count: number = 0;
        while (count < 100) {
            let row: number = GameBoard.getRandomInt(0, this.numRows - 1);
            let col: number = GameBoard.getRandomInt(0, this.numCols - 1);
            if (this.squares[row][col].isEmpty()) {
                return this.squares[row][col];
            }
            count++;
        }
        return new BoardSquare("blue");
    }

    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * This function is already defined for you
     * @returns - a string representation of the game board
     */
    toString(): string {
        let boardString: string = "";
        boardString = boardString.concat("Col :" + "       ");

        for (let col = 0; col < this.numCols; col++) {
            boardString = boardString.concat(col + "        ");
        }
        boardString = boardString.concat("\n");
        for (let row = 0; row < this.numRows; row++) {
            boardString = boardString.concat("Row : " + row + "   ");
            for (let col = 0; col < this.numCols; col++) {
                boardString = boardString.concat(
                    this.squares[row][col].toString() + "  ",
                );
            }
            boardString = boardString.concat("\n");
        }
        return boardString;
    }
}

/* After you have completed setUpEmptyBoard, you can run this
code with this command in the terminal to see if your colors
are getting assigned correctly:
 npx ts-node GameBoard.ts
 */

export function squareColors(board: GameBoard): string {
    let boardString: string = "";
    boardString = boardString.concat("Col :   ");

    for (let col = 0; col < board.getNumColumns(); col++) {
        boardString = boardString.concat(col + "   ");
    }
    boardString = boardString.concat("\n");
    for (let row = 0; row < board.getNumRows(); row++) {
        boardString = boardString.concat("Row : " + row + "   ");
        for (let col = 0; col < board.getNumColumns(); col++) {
            boardString = boardString.concat(
                board.getAllSquares()[row][col].getSquareColor() + "  ",
            );
        }
        boardString = boardString.concat("\n");
    }
    return boardString;
}

let boardEvenCols: GameBoard = new GameBoard(3, 6);
console.log(squareColors(boardEvenCols));

let boardOddCols: GameBoard = new GameBoard(5, 7);
console.log(squareColors(boardOddCols));
