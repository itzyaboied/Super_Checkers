import { Piece } from "./Piece";
import { Backpack } from "./Backpack";
import { BoardLocation } from "./BoardLocation";

export class Katerine extends Piece {
    numfreeze: number = 0;
    cooldown: boolean = false;
    constructor(
        abilities: string = "K",
        teamColor: string,
        original: boolean,
        backpack: Backpack,
        active: boolean = true,
    ) {
        super(abilities, teamColor, original, backpack, active);
        this.permAbilities.push("charge");
        this.permAbilities.push("move");
        this.permAbilities.push("freeze");
    }
    speak(): string {
        return "FOR KISLEV!!!";
    }
    override validPath(
        startLocation: BoardLocation,
        endLocation: BoardLocation,
    ): boolean {
        if (startLocation === endLocation) {
            return false;
        }
        if (endLocation.getRow() != startLocation.getRow()) {
            return false;
        }
        return true;
    }

    spawn(): Katerine {
        let clonedBackpack: Backpack = this.backpack.clone();

        let newPiece: Katerine = new Katerine(
            this.getSymbol().toLowerCase(),
            this.teamColor,
            false,
            clonedBackpack,
            true,
        );
        newPiece.symbol = this.symbol.toLowerCase();
        return newPiece;
    }

    updateAction(action: string): void {
        if (action === "freeze") {
            if (this.numfreeze % 2 == 1) {
                this.cooldown = true;
            } else if (this.numfreeze % 2 == 0) {
                this.cooldown = false;
            }
        }
        super.updateAction(action);
    }
}
