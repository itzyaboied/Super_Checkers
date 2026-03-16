/*Problem 12

12.1 Define a class named ActionResurrect that extends Action and
represents a 'resurrect' action with the following members:
- member field for the location of the start square
- constructor with two parameters: a game (of type GameF25), and the 
    location member field. Constructor should call
    the super's constructor and pass the game, "resurrect", and the
    start location.  
    The constructor should call validAction. If the action is not
    valid it should throw an ActionError.  
    
12.2 Implement method validAction 
    call checkValidResurrect from your rules class and return
    whether this action is valid 

12.3 Implement method performAction
    On a resurrect:
    - an inactive piece on the current team gets put back in play
        - it gets set to active
        - it gets set back on the board on a random empty square
    - update the action for the Piece doing the resurrecting  
    - the Piece doing the resurrecting speaks
    - the turn of the game is changed to the other player
 */

import { Action } from "./Action";
import { ActionError } from "../ActionError";
import { GameF25 } from "../elements/GameF25";
import { BoardLocation } from "../elements/BoardLocation";

export class ActionResurrect extends Action {
    constructor(game: GameF25, start: BoardLocation) {
        super(game, "resurrect", start);
        if (!this.validAction()) {
            throw new ActionError("Invalid resurrect action", "resurrect");
        }
    }

    validAction(): boolean {
        return this.game.getRules().checkValidResurrect(this.start);
    }

    performAction(): void {
        const board = this.game.getGameBoard();
        const startPiece = board.getSquare(this.start).getPiece();
        if (!startPiece) return;

        // Get an inactive piece from current team
        const inactivePieces = this.game.getCurrentTeam().filterPieces(false);
        if (inactivePieces.length === 0) return;

        const resurrectPiece = inactivePieces[0];
        resurrectPiece.setActive(true);

        // Place on a random empty square
        const emptySquare = board.findRandomEmptySquare();
        emptySquare.setPiece(resurrectPiece);

        // Update action for start piece
        startPiece.updateAction("resurrect");

        // Speak
        startPiece.speak();

        // Change turn
        this.game.changeTurn();
    }
}