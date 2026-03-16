/*Problem 11

11.1 Define a class named ActionSwapBP that extends Action and
represents a 'swap' action with the following members:
- member field for the location of the start square
- member field for the location of the end square
- constructor with three parameters, a game (of type GameF25), and the two
    location member fields. Constructor should call
    the super's constructor and pass the game, "swap", and the
    start location. It should set any remaining member fields. 
    The constructor should call validAction. If the action is not
    valid it should throw an ActionError.     
    
    
11.2 Implement method validAction 
    call checkValidSwapBP from your rules class and return
    whether this action is valid 

11.3 Implement method performAction
    On a swap:
    - the Piece on the start square swaps backpacks with the piece on the end square
    - All the abilities in the backpack of the Piece on the start square get renewed
        (set back to available)
    - The only ability in the backpack of the Piece on the end square that gets
        modified is the 'swap' ability that was used in the swap. It should be
        no longer available.
    - the Piece doing the swapping speaks
    - the turn of the game is changed to the other player
*/

import { Action } from "./Action";
import { GameF25 } from "../elements/GameF25";
import { BoardLocation } from "../elements/BoardLocation";
import { ActionError } from "../ActionError";

export class ActionSwapBP extends Action {
    private end: BoardLocation;

    constructor(game: GameF25, start: BoardLocation, end: BoardLocation) {
        super(game, "swap", start);
        this.end = end;

        if (!this.validAction()) {
            throw new ActionError("Invalid swap action", "swap");
        }
    }

    validAction(): boolean {
        // Call the rules method for swap validation
        return this.game.getRules().checkValidSwapBP(this.start, this.end);
    }

    performAction(): void {
        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(this.start);
        const endSquare = board.getSquare(this.end);

        if (startSquare.isEmpty() || endSquare.isEmpty())
            throw new Error("One of the squares is out of bounds");

        const startPiece = startSquare.getPiece();
        const endPiece = endSquare.getPiece();

        if (!startPiece || !endPiece)
            throw new Error("Cannot swap with empty square");

        // Swap backpacks
        startPiece.swapBackpack(endPiece);

        // Renew all abilities for the piece that initiated the swap
        startPiece.getBackpack().renew();

        // Disable the 'swap' ability for the piece that received the swap
        endPiece.updateAction("swap");

        // Piece speaks
        console.log(startPiece.speak());

        // Change turn
        this.game.changeTurn();
    }
}