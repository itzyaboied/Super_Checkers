/* HW10 Problem 4

4.1 Create a subclass of Piece named PieceBlueHen that will represent the 
main UD's Blue Hen Mascot. This class will inherit members from Piece and
additinally include:

- member field to represent the number of attacks its made default set to 0
- member field to represent whether it can fly - default set to true
Neither of these fields should be added to the constructor parameters

4.2 A private static member named MAX_NUM_ATTACKS to represent
the maximum number of attacks this BLueHen can make before it loses 
its ability to fly anywhere on the game board. Set this value to 3

4.3 A constructor with the parameters required by the superclass 
     - calls the super class' constructor (symbol should be set to 'H' by default)
     - adds "attack" to its permanent abilities

4.4 An accessor method:
    - getNumAttacks

4.5 A private mutator:
    – increaseNumAttacks - increments number of attacks by 1  
    
4.6 A PRIVATE method named updateFly that has no
parameters and no return values. This is the only
method that can modify (mutate) the member field 'flies'
It is private and should be called everytime the
number of attacks is increased. This method will
check the number of current attacks and if it exceeds
the MAX_NUM_ATTACKS, it cannot fly. Otherwise, it can fly.
NOTE: After you create this method - call it from 
inside of increaseNumAttacks.

4.7 An implementation for the method named speak that has no parameters
and returns the string 'Go UD!'

4.9 An implementation for method named spawn which will return a copy
of the BlueHen piece with the following properties:
- symbol - should be the lowercase value of cloned object's symbol
- teamColor - should match values of cloned object
- original - should be set to false
- backpack - should be a clone of the cloned object's backpack
- active - should be set to true

4.10 An override for the updateAction method that:
calls increaseNumAttacks if the action is "attack"
and calls the super's updateAction otherwise

Update Piece, PieceMinion, and PieceNeo classes before testing
with PieceClasses.ts
*/
import { BoardLocation } from "./BoardLocation";
import { Piece } from "./Piece";
import { Backpack } from "./Backpack";

export class PieceBlueHen extends Piece {
    private numAttacks: number = 0;

    private flies: boolean = true;

    private static MAX_NUM_ATTACKS: number = 3;

    constructor(
        abilities: string,
        teamColor: string,
        original: boolean,
        backpack: Backpack,
        active: boolean = true,
    ) {
        super(abilities, teamColor, original, backpack, active);
        this.permAbilities.push("attack");
        this.permAbilities.push("move");
    }

    getNumAttacks(): number {
        return this.numAttacks;
    }

    private increaseNumAttacks(): void {
        this.numAttacks++;
        this.updateFly();
    }

    private updateFly(): void {
        if (this.numAttacks > PieceBlueHen.MAX_NUM_ATTACKS) {
            this.flies = false;
        } else {
            this.flies = true;
        }
    }

    speak(): string {
        return "Go UD!";
    }

    spawn(): PieceBlueHen {
        let clonedBackpack: Backpack = this.backpack.clone();

        let newPiece: PieceBlueHen = new PieceBlueHen(
            this.getSymbol().toLowerCase(),
            this.teamColor,
            false,
            clonedBackpack,
            true,
        );
        newPiece.symbol = this.symbol.toLowerCase();
        return newPiece;
    }

    override validPath(
        startLocation: BoardLocation,
        endLocation: BoardLocation,
    ): boolean {
        if (startLocation === endLocation) {
            return false;
        }
        if (!this.flies) {
            if (endLocation.getCol() != startLocation.getCol()) {
                return false;
            } else if (
                Math.abs(endLocation.getRow() - startLocation.getRow()) != 1
            ) {
                return false;
            }
        }
        return true;
    }

    updateAction(action: string): void {
        if (action === "attack") {
            this.increaseNumAttacks();
        }
        super.updateAction(action);
    }
}
