/*Problem 9

9.1 Define a class named ActionRecruit that extends Action and
represents 'recruit' action with the following members:
- member field for the location of the start square
- member field for the location of the end square
- constructor with three parameters, a game (of type GameF25), and the two
    location member fields. Constructor should call
    the super's constructor and pass the game, "recruit", and the
    start location. It should set any remaining member fields. 
    The constructor should call validAction. If the action is not
    valid it should throw an ActionError.     
    
9.2 Implement method validAction 
    call checkValidRecruit from your rules class and return
    whether this action is valid 

9.3 Implement method performAction
    On a recruit:
     on an recruit:
    - the Piece on the End Square is removed from the opponent's team
    - the Piece on the End Square is added to the current player's team
    - the Piece being recruited speaks
    - update the action for the Piece doing the recruiting
    - the turn of the game is changed to the other player
*/

import { Action } from "./Action";
import { GameF25 } from "../elements/GameF25";
import { BoardLocation } from "../elements/BoardLocation";
import { ActionError } from "../ActionError";

export class ActionRecruit extends Action {
    private end: BoardLocation;

    constructor(game: GameF25, start: BoardLocation, end: BoardLocation) {
        super(game, "recruit", start);
        this.end = end;

        if (!this.validAction()) {
            throw new ActionError("Invalid recruit", "recruit");
        }
    }

    validAction(): boolean {
        return this.game.getRules().checkValidRecruit(this.start, this.end);
    }

    performAction(): void {
        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(this.start);
        const endSquare = board.getSquare(this.end);

        if (startSquare.isEmpty() || endSquare.isEmpty()) {
            throw new Error("Start or end square out of bounds");
        }

        const recruiter = startSquare.getPiece();
        const recruit = endSquare.getPiece();

        if (!recruiter) {
            throw new Error("No piece on start square to recruit");
        }
        if (!recruit) {
            throw new Error("No piece on end square to recruit");
        }

        // Remove the piece from opponent's team
        this.game.getOpponentTeam().removePieceFromTeam(recruit);

        // Add the piece to current team
        this.game.getCurrentTeam().addPieceToTeam(recruit);

        // The recruited piece speaks
        console.log(recruit.speak());

        // Update the action for the recruiter
        recruiter.updateAction("recruit");

        // Change turn to the other player
        this.game.changeTurn();
    }
}