/*Problem 10

10.1 Define a class named ActionEscape that extends Action and
represents an 'escape' action with the following members:
- member field for the location of the start square
- constructor with two parameters: a game (of type GameF25), and the 
    location member field. Constructor should call
    the super's constructor and pass the game, "escape", and the
    start location. It should set any remaining member fields.
    The constructor should call validAction. If the action is not
    valid it should throw an ActionError.       
    
10.2 Implement method validAction 
    call checkValidEscape from your rules class and return
    whether this action is valid 

10.3 Implement method performAction
    On an escape:
    - the Piece on the Start Square is removed from the board (but not the team)
    - the Piece doing the escaping is set to inactive
    - update the action for the Piece doing the escaping      
    - the Piece doing the escaping speaks
    - the turn of the game is changed to the other player
*/

import { Action } from "./Action";
import { GameF25 } from "../elements/GameF25";
import { BoardLocation } from "../elements/BoardLocation";
import { ActionError } from "../ActionError";

export class ActionEscape extends Action {
    constructor(game: GameF25, start: BoardLocation) {
        super(game, "escape", start);

        if (!this.validAction()) {
            throw new ActionError("Invalid escape", "escape");
        }
    }

    validAction(): boolean {
        return this.game.getRules().checkValidEscape(this.start);
    }

    performAction(): void {
        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(this.start);

        if (startSquare.isEmpty())
            throw new Error("Start square out of bounds");

        const piece = startSquare.getPiece();
        if (!piece) throw new Error("No piece on start square");

        // Remove from board but not team
        startSquare.removePiece();
        piece.setActive(false);

        // Update the action
        piece.updateAction("escape");

        // Piece speaks
        console.log(piece.speak());

        // Change turn
        this.game.changeTurn();
    }
}