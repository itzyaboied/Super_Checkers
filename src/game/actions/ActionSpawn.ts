/*Problem 7
Represents a 'spawn' action.

7.1 Define a class named ActionSpawn that extends Action and
represents a 'spawn' action with the following members:
- member field for the location of the start square
- constructor with two parameters: a game (of type GameF25), and the 
    location member field. Constructor should call
    the super's constructor and pass the game, "spawn", and the
    start location.
    The constructor should call validAction. If the action is not
    valid it should throw an ActionError.  
    
    
7.2 Implement method validAction 
    call checkValidSpawn from your rules class and return
    whether this action is valid 

7.3 Implement method performAction
    On a spawn:
    - the Piece on the Start Square is spawned
    - update the action for the Piece on start square
    - the spawn is placed on the end square and added to the current team   
    - the Piece being spawned speaks
    - the turn of the game is changed to the other player
*/

import { Action } from "./Action";
import { GameF25 } from "../elements/GameF25";
import { BoardLocation } from "../elements/BoardLocation";
import { ActionError } from "../ActionError";
import { Piece } from "../elements/Piece";

export class ActionSpawn extends Action {
    constructor(game: GameF25, start: BoardLocation) {
        super(game, "spawn", start);

        if (!this.validAction()) {
            throw new ActionError("Invalid spawn", "spawn");
        }
    }

    validAction(): boolean {
        return this.game.getRules().checkValidSpawn(this.start);
    }

    performAction(): void {
        const spawnedPiece = (
            this.game.getGameBoard().getSquare(this.start).getPiece() as Piece
        ).spawn();

        // Add spawned piece to current team
        this.game.getCurrentTeam().addPieceToTeam(spawnedPiece);

        // Find a random empty square
        const emptySquare = this.game.getGameBoard().findRandomEmptySquare();
        if (!emptySquare.isEmpty()) {
            throw new Error("No empty square to place spawned piece");
        }

        emptySquare.setPiece(spawnedPiece);

        // The piece speaks
        spawnedPiece.speak();

        // Switch turn
        this.game.changeTurn();
    }
}