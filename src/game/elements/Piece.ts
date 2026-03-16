/* HW 10 Problem 3 
Modify the abstract class named Piece class to include:
 
3.1 An abstract method named speak that has no parameters and returns
a string

3.2 An abstract method named spawn that has no parameters and returns
a Piece

3.3 A method named swapBackpack that has one Piece
parameter and returns nothing. This method swaps the backpack
of this Piece with the other Piece.

3.4 A method named allowableAction that has one string parameter representing
the type of action the Piece can make and returns a boolean.
The method will check if this piece can make the action by checking if
the action is listed in it's permanent abilities member field OR if
the action is in the piece's backpace and is available. 
HINT: to check this last requirement you should use the 
hasUsableAbility method you created in the backpack!

3.5 A method named updateAction that has one string parameter
representing an action and doesn't return anything. This 
method calls the backpack's setAvailable method to set the
available field for this ability action to false. 


Update PieceBlueHen, PieceMinion, and PieceNeo classes before testing
with PieceClasses.ts
*/

import { Backpack } from "./Backpack";
import { BoardLocation } from "./BoardLocation";

export abstract class Piece {
    protected permAbilities: string[] = ["move"];

    constructor(
        protected symbol: string,
        protected teamColor: string,
        protected original: boolean,
        protected backpack: Backpack,
        protected active: boolean = true,
    ) {}

    getSymbol(): string {
        return this.symbol;
    }

    getTeamColor(): string {
        return this.teamColor;
    }

    setTeamColor(teamColor: string): void {
        this.teamColor = teamColor;
    }

    getBackpack(): Backpack {
        return this.backpack;
    }

    setBackpack(backpack: Backpack): void {
        this.backpack = backpack;
    }

    isOriginal(): boolean {
        return this.original;
    }

    isActive(): boolean {
        return this.active;
    }

    setActive(active: boolean): void {
        this.active = active;
    }

    /* For development purposes - all pieces
    can move anywhere on board except from start
    location to start location. So all other paths
    will be considered valid. 
    After game is developed, we will
    add the logic for limiting paths each
    piece can take and override this method
    in each subclass
    */
    validPath(
        startLocation: BoardLocation,
        endLocation: BoardLocation,
    ): boolean {
        if (startLocation === endLocation) {
            return false;
        }
        return true;
    }

    toString(): string {
        return this.teamColor.slice(0, 3) + " " + this.symbol;
    }

    toStringwithBackPack(): string {
        return this.toString() + "\t" + this.backpack.toString();
    }

    // Add your methods

    // 3.1 An abstract method named speak that has no parameters and returns a string
    abstract speak(): string;

    // 3.2 An abstract method named spawn that has no parameters and returns a Piece
    abstract spawn(): Piece;

    // 3.3 A method named swapBackpack that has one Piece parameter and returns nothing.
    // This method swaps the backpack of this Piece with the other Piece.
    swapBackpack(other: Piece): void {
        let temp: Backpack = this.backpack;
        this.backpack = other.getBackpack();
        other.setBackpack(temp);
    }

    // 3.4 A method named allowableAction that has one string parameter representing
    // the type of action the Piece can make and returns a boolean.
    // The method will check if this piece can make the action by checking if
    // the action is listed in its permanent abilities member field OR if
    // the action is in the piece's backpack and is available
    allowableAction(action: string): boolean {
        // check permanent abilities first
        let i: number = 0;
        while (i < this.permAbilities.length) {
            if (this.permAbilities[i] === action) {
                return true;
            }
            i++;
        }
        // check backpack abilities
        if (this.backpack.hasUsableAbility(action)) {
            return true;
        }
        return false;
    }

    // 3.5 A method named updateAction that has one string parameter
    // representing an action and doesn't return anything.
    // This method calls the backpack's setAvailable method to set the
    // available field for this ability action to false.
    updateAction(action: string): void {
        this.backpack.setAvailable(action, false);
    }
}