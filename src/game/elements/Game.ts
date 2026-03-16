/* Homework 10 - Part B
Problem 1

1.1 Create a new abstract class named Game. 
This class should have the following members:
- a member field for the GameBoard
- a member field for team A
- a member field for team B
- a member field (turn) that will hold the color of the team who’s turn it is
       this field will be changed after each player takes a turn

- constructor with the 4 parameters listed above in that order -
    it should set these fields and call initializeGameBoard
    to set up the GameBoard with pieces on it  - this method is in the next 
    instructions

1.2 A private method name initializeGameBoard that has no parameters 
   and doesn't return a value. This method should
   set up both Team’s pieces randomly on the board
   Add a call to this method to your constuctor.
   Hint: use your findRandomEmptySquare method in your GameBoard class
   You should write your algorithm for this method before coding it!!

1.3 The acessor methods:
    - getGameBoard
1.4 A method named getCurrentTeam that has no parameters and 
returns the Team (not just the color) of the team whose turn it is 
    - 
1.5 A method named getOpponentTeam that has no parameters and
returns the Team (not just the color) of the team whose turn it isn’t 

1.6 A method named isTurn that has one Team parameter and returns a 
          boolean representing whether it is this Team’s turn 

1.7 A method named changeTurn that has no parameters and doesn't return
a value. This method sets the member field 'turn' to the other Team’s color

1.8 An abstract method named isGameEnded that has no parameters 
and returns a boolean.

1.9 An abstract method named getWinner that has no parameters 
and returns a string.

1.10 A toString method is already defined for you.

*/

import { GameBoard } from "./GameBoard";
import { Team } from "./Team";
/*
1.2 A private method name initializeGameBoard that has no parameters 
   and doesn't return a value. This method should
   set up both Team’s pieces randomly on the board
   Add a call to this method to your constuctor.
   Hint: use your findRandomEmptySquare method in your GameBoard class
   You should write your algorithm for this method before coding it!!

*/

export abstract class Game {
    private board: GameBoard;
    private teamA: Team;
    private teamB: Team;
    private turn: string; // color of team whose turn it is

    constructor(board: GameBoard, teamA: Team, teamB: Team, turn: string) {
        this.board = board;
        this.teamA = teamA;
        this.teamB = teamB;
        this.turn = turn;
        this.initializeGameBoard(); // set up the board right away
    }

    /**
     * 1.2 initializeGameBoard
     * Sets up both teams’ pieces randomly on the board.
     */
    private initializeGameBoard(): void {
        const allTeams = [this.teamA, this.teamB];

        for (let team of allTeams) {
            const pieces = team.getAllPieces();

            for (let i = 0; i < pieces.length; i++) {
                const piece = pieces[i];
                const randomSquare = this.board.findRandomEmptySquare();

                // No null check needed if findRandomEmptySquare always returns a valid square
                randomSquare.setPiece(piece);
            }
        }
    }

    /** 1.3 Accessor: returns the GameBoard */
    getGameBoard(): GameBoard {
        return this.board;
    }

    /** 1.4 Returns the Team whose turn it is */
    getCurrentTeam(): Team {
        if (this.teamA.getTeamColor() === this.turn) {
            return this.teamA;
        } else {
            return this.teamB;
        }
    }

    /** 1.5 Returns the opposing Team */
    getOpponentTeam(): Team {
        if (this.teamA.getTeamColor() === this.turn) {
            return this.teamB;
        } else {
            return this.teamA;
        }
    }

    /** 1.6 Returns true if it is this team's turn */
    isTurn(team: Team): boolean {
        return team.getTeamColor() === this.turn;
    }

    /** 1.7 Changes turn to the other team's color */
    changeTurn(): void {
        if (this.turn === this.teamA.getTeamColor()) {
            this.turn = this.teamB.getTeamColor();
        } else {
            this.turn = this.teamA.getTeamColor();
        }
    }

    /** 1.8 Abstract method: must be implemented by subclasses */
    abstract isGameEnded(): boolean;

    /** 1.9 Abstract method: must be implemented by subclasses */
    abstract getWinner(): string;

    /*
    toString(): string {
        let retString: string = "";
        //retString = retString.concat("Game Board <br>");
        //retString = retString.concat("--------------");
        retString = retString.concat("\n" + this.getGameBoard().toString());
        retString = retString.concat(
            "\n" + this.getCurrentTeam().toString() + "\n",
        );
        retString = retString.concat(
            "\n" + this.getOpponentTeam().toString() + "\n",
        );
        retString = retString.concat(
            "\nIt is Team " +
                this.getCurrentTeam().getTeamColor() +
                "'s turn\n",
        );
        return retString.toString();
    }
*/
}
