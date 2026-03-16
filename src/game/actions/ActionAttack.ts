/*Problem 8

8.1 Define a class named ActionAttack that extends Action and
represents an 'attack' action with the following members:
- member field for the location of the start square
- member field for the location of the end square
- constructor with three parameters, a game (of type GameF25), and the two
    location member fields. Constructor should call
    the super's constructor and pass the game, "attack", and the
    start location. It should set any remaining member fields.
    The constructor should call validAction. If the action is not
    valid it should throw an ActionError.    
    
8.2 Implement method validAction 
    call checkValidAttack from your rules class and return
    whether this action is valid 

8.3 Implement method performAction
    On an attack:
    - the Piece on the End Square is removed from the board
    - the Piece on the End Square is set to inactive
    - Piece on the Start Square is moved to the End Square
    - update the action for the Piece doing the attacking
    - the Piece being attacked speaks
    - the turn of the game is changed to the other player
*/

import { Action } from "./Action";
import { GameF25 } from "../elements/GameF25";
import { BoardLocation } from "../elements/BoardLocation";
import { ActionError } from "../ActionError";
import { Rules } from "../elements/Rules";

export class ActionAttack extends Action {
    private end: BoardLocation;
    private rules: Rules;

    constructor(game: GameF25, start: BoardLocation, end: BoardLocation) {
        super(game, "attack", start);
        this.end = end;
        this.rules = this.game.getRules();

        if (!this.validAction()) {
            throw new ActionError(this.rules.getMessage(), "Invalid attack");
        }
    }

    validAction(): boolean {
        return this.rules.checkValidAttack(this.start, this.end);
    }

    performAction(): void {
        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(this.start)!;
        const endSquare = board.getSquare(this.end)!;

        const attacker = startSquare.getPiece()!;
        const defender = endSquare.getPiece()!;

        // Remove defender from board and set inactive
        endSquare.removePiece();
        defender.setActive(false);

        // Move attacker to end square
        startSquare.removePiece();
        endSquare.setPiece(attacker);

        // Update attacker's action
        attacker.updateAction("attack");

        // Defender speaks
        console.log(defender.speak());

        // Change turn
        this.game.changeTurn();
    }
}
