/*Problem 6

6.1 Define a class named ActionMove that extends Action and
represents a 'move' action with the following members:
- member field for the location of the start square
- member field for the location of the end square
- constructor with three parameters, a game (of type GameF25), and the two
    location member fields. Constructor should call
    the super's constructor and pass the game, "move", and the
    start location. It should set any remaining member fields.  
    The constructor should call validAction. If the action is not
    valid it should throw an ActionError.      

6.2 Implement method validAction 
    call checkValidMove from your rules class and return
    whether this move is valid 

6.3 Implement method performAction - 
    On a move:
    - the Piece on the Start Square is moved to the End Square   
    - the Piece speaks
    - the turn of the game is changed to the other player
*/

import { Action } from "./Action";
import { GameF25 } from "../elements/GameF25";
import { BoardLocation } from "../elements/BoardLocation";
import { ActionError } from "../ActionError";

export class ActionMove extends Action {
    private end: BoardLocation;

    constructor(game: GameF25, start: BoardLocation, end: BoardLocation) {
        super(game, "move", start);
        this.end = end;

        if (!this.validAction()) {
            throw new ActionError("Invalid move", "move");
        }
    }

    validAction(): boolean {
        return this.game.getRules().checkValidMove(this.start, this.end);
    }

    performAction(): void {
        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(this.start);
        const endSquare = board.getSquare(this.end);

        const piece = startSquare.getPiece()!;

        // Move the piece to the end square
        endSquare.setPiece(piece);
        startSquare.removePiece();

        // The piece speaks
        console.log(piece.speak());

        // Change turn to the other player
        this.game.changeTurn();
    }
}
