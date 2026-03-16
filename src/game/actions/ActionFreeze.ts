import { Action } from "./Action";
import { GameF25 } from "../elements/GameF25";
import { BoardLocation } from "../elements/BoardLocation";
import { ActionError } from "../ActionError";
import { Rules } from "../elements/Rules";

export class freeze extends Action {
    private enemyEnd: BoardLocation;
    private rules: Rules;

    constructor(
        game: GameF25,
        start: BoardLocation,
        end: BoardLocation,
        enemyEnd: BoardLocation,
    ) {
        super(game, "freeze", start);

        this.rules = new Rules();
        this.enemyEnd = enemyEnd;

        if (!this.validAction()) {
            throw new ActionError(this.rules.getMessage(), "freeze");
        }
    }
    validAction(): boolean {
        return this.rules.checkValidCharge(this.start, this.enemyEnd);
    }
    performAction(): void {
        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(this.start);
        const endSquare = board.getSquare(this.enemyEnd);
        const endpiece = endSquare.getPiece();
        if (startSquare.isEmpty() || endSquare.isEmpty()) {
            throw new Error("Board square out of bounds");
        }

        const piece = startSquare.getPiece();
        if (!piece) {
            throw new Error("No piece on start square");
        }

        // Move the piece to the end square
        endpiece?.setActive(false);
        // The piece speaks
        console.log(piece.speak());
        // Change turn to the other player
        this.game.changeTurn();
    }
}
