/* HW10 Problem 6

6.1 Create a subclass of Piece named PieceNeo that will represent the 
main character from The Matrix movie.This class will inherit 
members from Piece and additinally include:

- member field to represent the number of attacks its made default set to 0
- member field to represent the number of recruits its made default set to 0
- member field to represent the number of escapes its made default set to 0

6.2 constructor with the parameters required by the superclass plus two
    new paratmeters: one for number of attacks and number of recruits (in that order)
     - calls the super class' constructor (symbol should be set to 'N' by default)
     - adds "attack" ,"recruit", "escape" to its permanent abilities  


6.3 Accessor methods:
     - getNumAttacks, getNumRecruits, getNumEscapes

6.4 Private mutator methods:
    
– increaseNumAttacks - increments number of attacks by 1   
- increaseNumRecruits - increments number of recruits by 1
- increaseNumEscapes - increments number of escapes by 1 
    
6.5 An implementation for the method named speak that has no parameters
and returns the string 'Hiya Fellas'

6.6 An implementation for method named spawn which will return a copy
of the Neo piece with the following properties:
- symbol - should be the lowercase value of cloned object's symbol
- teamColor - should match values of cloned object
- original - should be set to false
- backpack - should be a clone of the cloned object's backpack
- active - should be set to true

6.6 An override for the updateAction method that:
calls increaseNumRecruits if the action is "recruit",
calls increaseNumAttacks if the action is "attack",
calls increaseNumEscapes if the action is "escape"
and calls the super's updateAction otherwise

Update Piece, PieceBlueHen, and PieceMinion classes before testing
with PieceClasses.ts
*/

import { Piece } from "./Piece";
import { Backpack } from "./Backpack";
import { BoardLocation } from "./BoardLocation";

/*
6.1 Create a subclass of Piece named PieceNeo that will represent the 
main character from The Matrix movie.This class will inherit 
members from Piece and additinally include:

- member field to represent the number of attacks its made default set to 0
- member field to represent the number of recruits its made default set to 0
- member field to represent the number of escapes its made default set to 0

6.2 constructor with the parameters required by the superclass plus two
    new paratmeters: one for number of attacks and number of recruits (in that order)
     - calls the super class' constructor (symbol should be set to 'N' by default)
     - adds "attack" ,"recruit", "escape" to its permanent abilities 
export abstract class Piece {
    protected permAbilities: string[] = ["move"];

    constructor(
        protected symbol: string,
        protected teamColor: string,
        protected original: boolean,
        protected backpack: Backpack,
        protected active: boolean = true,
    ) {}
*/
export class PieceNeo extends Piece {
    private numAttacks: number = 0;
    private numRecruits: number = 0;
    private numEscapes: number = 0;

    constructor(
        symbol: string,
        teamColor: string,
        original: boolean,
        backpack: Backpack,
        active: boolean,
        numAttacks: number = 0,
        numRecruits: number = 0,
    ) {
        super(symbol, teamColor, original, backpack, active);
        this.numAttacks = numAttacks;
        this.numRecruits = numRecruits;
        this.permAbilities.push("move");
        this.permAbilities.push("attack");
        this.permAbilities.push("recruit");
        this.permAbilities.push("escape");
    }

    override validPath(
        startLocation: BoardLocation,
        endLocation: BoardLocation,
    ): boolean {
        if (startLocation === endLocation) {
            return false;
        }
        if (
            Math.abs(endLocation.getCol() - startLocation.getCol()) == 1 &&
            Math.abs(endLocation.getRow() - startLocation.getRow()) == 1
        ) {
            return true;
        }

        return false;
    }

    getNumAttacks(): number {
        return this.numAttacks;
    }

    getNumRecruits(): number {
        return this.numRecruits;
    }

    getNumEscapes(): number {
        return this.numEscapes;
    }

    private increaseNumAttacks(): void {
        this.numAttacks++;
    }

    private increaseNumRecruits(): void {
        this.numRecruits++;
    }

    private increaseNumEscapes(): void {
        this.numEscapes++;
    }

    speak(): string {
        return "Hiya Fellas";
    }

    /*
6.6 An implementation for method named spawn which will return a copy
of the Neo piece with the following properties:
- symbol - should be the lowercase value of cloned object's symbol
- teamColor - should match values of cloned object
- original - should be set to false
- backpack - should be a clone of the cloned object's backpack
- active - should be set to true


*/
    spawn(): PieceNeo {
        let newPiece: PieceNeo = new PieceNeo(
            this.getSymbol().toLowerCase(),
            this.teamColor,
            false,
            this.backpack.clone(),
            true,
        );
        return newPiece;
    }

    updateAction(action: string): void {
        if (action === "attack") {
            this.increaseNumAttacks();
        } else if (action === "recruit") {
            this.increaseNumRecruits();
        } else if (action === "escape") {
            this.increaseNumEscapes();
        }
        super.updateAction(action);
    }
}
