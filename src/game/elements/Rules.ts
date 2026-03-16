/* Homework 10 Part B Problem 3:

3.1 Create a class named Rules that will represent the set of rules 
for each Action in in the game with the following members:

- member field for game (which should be of type GameF25)
- constructor with one game parameter that sets this field 

3.2 accessors 
    - getMessage

3.3 methods below - all return a boolean
    checkValidMove - two parameters : start: BoardLocation, end: BoardLocation
    checkValidAttack - two parameters : start: BoardLocation, end: BoardLocation
    checkValidRecruit - two parameters : start: BoardLocation, end: BoardLocation
    checkValidSpawn - one parameter: start: BoardLocation
    checkValidEscape - start: BoardLocation
    checkValidResurrect -start: BoardLocation
    checkValidSwapBP - two parameters : start: BoardLocation, end: BoardLocation
    
    These methods should check the rules described in the HW10 Canvas assignment
    and return true if the action can be taken and false otherwise. If the action
    is not valid - the message field should be updated with a message to the player
    explaining why the action is not valid.  
    For example: "The piece you are moving does not belong to your team."

Tips:  
Implement the code for a valid move first. 

You can test your Rules class with 'Rules.test.ts'. Look at the tests
to debug your code.

Note: there are specific messages for each invalid action.

 "Start square out of bounds."
 "No Piece on start square."
 "Piece on start square is not yours."
 "Piece on start square can't take that action."
 "End square out of bounds."
  "End square should be empty."
  "No Piece on end square."
  "Piece on end square is yours."
  "No inactive pieces to resurrect."

*/
import { GameF25 } from "./GameF25";
import { BoardLocation } from "./BoardLocation";
import { Piece } from "./Piece";
import { Team } from "./Team";

export class Rules {
    game: GameF25;
    private message: string = "";

    constructor(
        game: GameF25 = new GameF25(
            "warhammer",
            new Team("titus squad", []),
            new Team("Tyranid", []),
            "zero",
        ),
    ) {
        this.game = game;
    }

    getMessage(): string {
        return this.message;
    }

    private checkCommonRequirements(
        start: BoardLocation,
        action: string,
    ): Piece | null {
        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(start);

        if (!board.inBounds(start)) {
            this.message = "Start square out of bounds.";
            return null;
        }

        if (startSquare.isEmpty()) {
            this.message = "No Piece on start square.";
            return null;
        }

        const piece = startSquare.getPiece()!;
        if (
            piece.getTeamColor() !== this.game.getCurrentTeam().getTeamColor()
        ) {
            this.message = "Piece on start square is not yours.";
            return null;
        }

        if (!piece.allowableAction(action)) {
            this.message = "Piece on start square can't take that action.";
            return null;
        }

        return piece;
    }

    checkValidMove(start: BoardLocation, end: BoardLocation): boolean {
        const piece = this.checkCommonRequirements(start, "move");
        if (!piece) return false;

        const board = this.game.getGameBoard();
        const endSquare = board.getSquare(end);

        if (!endSquare.isEmpty()) {
            this.message = "End square should be empty.";
            return false;
        }

        if (!board.inBounds(end)) {
            this.message = "End square out of bounds.";
            return false;
        }

        if (!piece.validPath(start, end)) {
            this.message = "Invalid path for this piece.";
            return false;
        }

        this.message = "";
        return true;
    }
    checkValidAttack(start: BoardLocation, end: BoardLocation): boolean {
        const piece = this.checkCommonRequirements(start, "attack");
        if (!piece) return false;

        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(start);
        const endSquare = board.getSquare(end);

        const attacker = startSquare.getPiece();

        if (!attacker?.allowableAction("attack")) {
            this.message = "Piece on start square can't take that action.";
            return false;
        }

        if (!board.inBounds(end)) {
            this.message = "End square out of bounds.";
            return false;
        }

        const defender = endSquare.getPiece();
        if (!defender) {
            this.message = "No Piece on end square.";
            return false;
        }

        if (
            defender.getTeamColor() ===
            this.game.getCurrentTeam().getTeamColor()
        ) {
            this.message = "Piece on end square is yours.";
            return false;
        }

        if (!attacker.validPath(start, end)) {
            this.message = "Invalid path for this piece.";
            return false;
        }

        this.message = "";
        return true;
    }
    checkValidSpawn(start: BoardLocation): boolean {
        const piece = this.checkCommonRequirements(start, "spawn");
        if (!piece) return false;

        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(start);

        if (!board.inBounds(start)) {
            this.message = "Start square out of bounds.";
            return false;
        }

        const this_piece = startSquare.getPiece();
        if (!this_piece) {
            this.message = "No piece on start square.";
            return false;
        }

        if (
            piece.getTeamColor() !== this.game.getCurrentTeam().getTeamColor()
        ) {
            this.message = "Piece on start square is not yours.";
            return false;
        }

        if (!piece.allowableAction("spawn")) {
            this.message = "Piece on start square can't take that action.";
            return false;
        }

        this.message = "";
        return true;
    }
    // Same pattern for attack, recruit, swap, spawn, escape, resurrect
    checkValidRecruit(start: BoardLocation, end: BoardLocation): boolean {
        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(start);
        const endSquare = board.getSquare(end);

        if (startSquare.isEmpty()) {
            this.message = "Start square out of bounds.";
            return false;
        }
        if (endSquare.isEmpty()) {
            this.message = "End square out of bounds.";
            return false;
        }

        const piece = startSquare.getPiece();
        const target = endSquare.getPiece();

        if (!piece) {
            this.message = "No piece on start square.";
            return false;
        }
        if (!target) {
            this.message = "No piece on end square.";
            return false;
        }

        if (
            piece.getTeamColor() !== this.game.getCurrentTeam().getTeamColor()
        ) {
            this.message = "Piece on start square is not yours.";
            return false;
        }

        if (!piece.allowableAction("recruit")) {
            this.message = "Piece on start square can't take that action.";
            return false;
        }

        if (
            target.getTeamColor() !== this.game.getOpponentTeam().getTeamColor()
        ) {
            this.message = "Piece on end square is yours.";
            return false;
        }

        if (!piece.validPath(start, end)) {
            this.message = "Invalid path for this piece.";
            return false;
        }

        this.message = "";
        return true;
    }
    checkValidEscape(start: BoardLocation): boolean {
        const piece = this.checkCommonRequirements(start, "escape");
        if (!piece) return false;

        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(start);

        const this_piece = startSquare.getPiece();

        if (
            this_piece?.getTeamColor() !==
            this.game.getCurrentTeam().getTeamColor()
        ) {
            this.message = "Piece on start square is not yours.";
            return false;
        }

        if (!this_piece.allowableAction("escape")) {
            this.message = "Piece on start square can't take that action.";
            return false;
        }

        this.message = "";
        return true;
    }
    checkValidSwapBP(start: BoardLocation, end: BoardLocation): boolean {
        const piece = this.checkCommonRequirements(start, "swap");
        if (!piece) return false;

        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(start);
        const endSquare = board.getSquare(end);
        const startPiece = startSquare.getPiece();
        const endPiece = endSquare.getPiece();

        if (!board.inBounds(end)) {
            this.message = "End square out of bounds.";
            return false;
        }
        if (!endPiece) {
            this.message = "No Piece on end square.";
            return false;
        }

        // End piece must belong to opponent
        if (
            endPiece.getTeamColor() ===
            this.game.getCurrentTeam().getTeamColor()
        ) {
            this.message = "Piece on end square is not yours.";
            return false;
        }

        // Path must be valid (for now always true)
        if (!startPiece?.validPath(start, end)) {
            this.message = "Invalid path.";
            return false;
        }

        return true;
    }
    checkValidResurrect(start: BoardLocation): boolean {
        const piece = this.checkCommonRequirements(start, "resurrect");
        if (!piece) return false;

        const board = this.game.getGameBoard();

        const inactivePieces = this.game.getCurrentTeam().filterPieces(false);
        if (inactivePieces.length === 0) {
            this.message = "No inactive pieces to resurrect.";
            return false;
        }

        const emptySquare = board.findRandomEmptySquare();
        if (!emptySquare.isEmpty()) {
            this.message = "No empty square to place resurrected piece.";
            return false;
        }

        return true;
    }

    checkValidCharge(start: BoardLocation, end: BoardLocation): boolean {
        const piece = this.checkCommonRequirements(start, "charge");
        if (!piece) {
            return false;
        }

        const board = this.game.getGameBoard();
        const startSquare = board.getSquare(start);
        const endSquare = board.getSquare(end);

        const attacker = startSquare.getPiece();

        if (!board.inBounds(end)) {
            this.message = "End square out of bounds.";
            return false;
        }

        const defender = endSquare.getPiece();
        if (!defender) {
            this.message = "No Piece on end square.";
            return false;
        }

        if (
            defender.getTeamColor() ===
            this.game.getCurrentTeam().getTeamColor()
        ) {
            this.message = "Piece on end square is yours.";
            return false;
        }

        if (!attacker?.validPath(start, end)) {
            this.message = "Invalid path for this piece.";
            return false;
        }

        return true;
    }
    //rule so that the piece that is pushed does not go out of bounds or where it shouldn't be
    checkPushLocation(start: BoardLocation, end: BoardLocation): boolean {
        const board = this.game.getGameBoard();

        const startSquare = board.getSquare(start);

        if (startSquare.isEmpty()) {
            this.message = "No Piece on start square.";
            return false;
        }

        if (!board.inBounds(end)) {
            this.message = "End square out of bounds.";
            return false;
        }

        this.message = "";
        return true;
    }

    //NEW RULE: if only one piece is left in the team, there is a 10% chance it will kill itself(deactivate) per turn;
    isLastOneStanding(): void {
        const team_Pieces: Piece[] = this.game.getCurrentTeam().getAllPieces(); //current team pieces
        let active_pieces: Piece[] = []; //all current active pieces
        for (let i = 0; i < team_Pieces.length; i++) {
            if (team_Pieces[i].isActive()) {
                active_pieces.push(team_Pieces[i]);
            }
        }
        if (active_pieces.length === 1) {
            if (Math.floor(Math.random() * 10) === 1) {
                //1 could be any number in the range 0-10 for the 10% chance. Piece will suicide if the random number is 1 for this case.
                active_pieces[0].setActive(false);
            }
        }
    }
}
