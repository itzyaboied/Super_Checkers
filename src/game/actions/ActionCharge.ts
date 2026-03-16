import { Action } from "./Action";
import { GameF25 } from "../elements/GameF25";
import { BoardLocation } from "../elements/BoardLocation";
import { ActionError } from "../ActionError";
import { Rules } from "../elements/Rules";

export class Charge extends Action {
    private end: BoardLocation;
    private rules: Rules;

    constructor(game: GameF25, start: BoardLocation, end: BoardLocation) {
        super(game, "charge", start);
        this.end = end;
        this.rules = this.game.getRules();

        if (!this.validAction()) {
            throw new ActionError(this.rules.getMessage(), "Invalid charge");
        }
    }
    validAction(): boolean {
        return this.rules.checkValidCharge(this.start, this.end);
    }
    performAction(): void {
        this.pushEnemy();
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
    pushEnemy(): void {
        const board = this.game.getGameBoard();
        const endSquare = board.getSquare(this.end);

        const endPiece = endSquare.getPiece()!;

        let colChange: number = this.end.getCol() - this.start.getCol();
        let rowChange: number = this.end.getRow() - this.start.getCol();

        let enemyEnd: BoardLocation = new BoardLocation(
            Math.abs(this.end.getRow() + rowChange),
            Math.abs(this.end.getCol() + colChange),
        );
        if (!this.rules.checkPushLocation(this.end, enemyEnd)) {
            throw new ActionError(
                this.rules.getMessage(),
                "No square to push to",
            );
        }
        const enderpiece = board.getSquare(enemyEnd);

        enderpiece.setPiece(endPiece);
        endSquare.removePiece();
    }
}
