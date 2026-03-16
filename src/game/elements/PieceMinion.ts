/* HW10 Problem 5

5.1 Create a subclass of Piece named PieceMinion that will represent a 
minion character from the Despicable Me movie. This class will inherit 
members from Piece and additinally include:

- member field to represent the number of recruits its made default set to 0
This field should be added to the constructor parameters

5.2 A constructor with the parameters required by the superclass 
     - calls the super class' constructor (symbol should be set to 'M' by default)
     - adds "recruit" to its permanent abilities

5.3 An accessor method:
    - getNumRecruits

5.4 A private mutator:
    – increaseNumRecruits - increments number of recruits by 1  
    
5.5 An implementation for the method named speak that has no parameters
and returns the string 'Bello!'

5.6 An implementation for method named spawn which will return a copy
of the Minion piece with the following properties:
- symbol - should be the lowercase value of cloned object's symbol
- teamColor - should match values of cloned object
- original - should be set to false
- backpack - should be a clone of the cloned object's backpack
- active - should be set to true

5.7 An override for the updateAction method that:
calls increaseNumRecruits if the action is "recruit"
and calls the super's updateAction otherwise

Update Piece, PieceBlueHen, and PieceNeo classes before testing
with PieceClasses.ts
*/

import { Piece } from "./Piece";
import { Backpack } from "./Backpack";
import { BoardLocation } from "./BoardLocation";
export class PieceMinion extends Piece {
    private numRecruits: number;

    constructor(
        abilities: string = "M",
        teamColor: string,
        original: boolean,
        backpack: Backpack,
        active: boolean = true,
        numRecruits: number = 0,
    ) {
        super(abilities, teamColor, original, backpack, active);
        this.numRecruits = numRecruits;
        this.permAbilities.push("recruit");
        this.permAbilities.push("move");
    }

    getNumRecruits(): number {
        return this.numRecruits;
    }

    private increaseNumRecruits(): void {
        this.numRecruits++;
    }
    override validPath(
        startLocation: BoardLocation,
        endLocation: BoardLocation,
    ): boolean {
        if (startLocation === endLocation) {
            return false;
        }
        if (
            Math.abs(endLocation.getCol() - startLocation.getCol()) > 1 ||
            Math.abs(endLocation.getRow() - startLocation.getRow()) > 1
        ) {
            return false;
        }

        return true;
    }
    speak(): string {
        return "Bello!";
    }
    //5.6 An implementation for method named spawn which will return a copy
    //of the Minion piece with the following properties:
    // symbol - should be the lowercase value of cloned object's symbol
    // teamColor - should match values of cloned object
    //- original - should be set to false
    //- backpack - should be a clone of the cloned object's backpack
    //- active - should be set to true

    spawn(): PieceMinion {
        let newPiece: PieceMinion = new PieceMinion(
            this.getSymbol().toLowerCase(),
            this.teamColor,
            false,
            this.backpack.clone(),
            true,
        );
        return newPiece;
    }

    updateAction(action: string): void {
        if (action === "recruit") {
            this.increaseNumRecruits();
        }
        super.updateAction(action);
    }
}
