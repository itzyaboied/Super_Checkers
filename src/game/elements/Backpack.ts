/* HW 10 Problem 2 
Define a class named Backpack that has:

2.1 One member field: 
 - an array of Abilities set to an empty array by default
 - a constructor with one parameter that sets this property
  
2.2 A getter for the member field
    getAbilities

2.3 One setter for the member field
    setAbilities

2.4 A method named renew that has no parameters and 
sets all the abilities available field to true.

2.5 A method named hasUsableAbility that has one
parameter string that represents the description of
an ability and returns a boolean representing
whether the backpack has this ability and it is
available.

2.6 A method named setAvailable that has two parameters: a
string representing the description of the ability and
a boolean representing whether the ability should be set to available. This
method will find the FIRST instance in the backpack that has
a matching description AND does not match the available field - 
then the method updates the available field.

Example:   setAvailable("spawn", true)
           would update this backpack's abilities from:
           " spawn:available "
           " spawn:expired "

           to:
           "spawn:available "
           "spawn:available "

Example:   setAvailable("spawn", false)
           would update this backpack's abilities from:
           " spawn:expired "
           " spawn:available "

           to:
           " spawn:expired "
           " spawn:expired "

2.6 A clone method for this class that returns a deep copy of this object.

2.7 A method named emptyBackpack that has no parameters and
doesn't return anything. This method sets the array of 
abilities to an empty array.

2.8 An equals method that has one Backpack parameter and returns a boolean. This
method compares the NUMBER of abilities in the backpack. 
Two instances of a Backpack will be considered equivalent they have the same
number of abilities.

2.9 A toString method that has no parameters and returns the toString value
of each ability in the backpack inside of square brackets. Example:

    [ spawn:expired  steal:available  swap:expired ]

-You can test your class with Backpack.test.ts
*/

import { Ability } from "./Ability";

export class Backpack {
    private abilities: Ability[] = [];

    // 2.1 constructor
    constructor(abilities: Ability[] = []) {
        this.abilities = abilities;
    }

    // 2.2 getter
    getAbilities(): Ability[] {
        return this.abilities;
    }

    // 2.3 setter
    setAbilities(abilities: Ability[]): void {
        this.abilities = abilities;
    }
    renew(): void {
        let count: number = 0;

        while (count < this.abilities.length) {
            this.abilities[count].setAvailable(true);
            count++;
        }
    }
    hasUsableAbility(description: string): boolean {
        let count: number = 0;
        while (count < this.abilities.length) {
            if (
                this.abilities[count].getDescription() == description &&
                this.abilities[count].isAvailable()
            ) {
                return true;
            }
            count++;
        }

        return false;
    }
    setAvailable(description: string, set: boolean): number {
        let count: number = 0;

        while (count < this.abilities.length) {
            if (
                this.abilities[count].getDescription() == description &&
                this.abilities[count].isAvailable() != set
            ) {
                this.abilities[count].setAvailable(set);
                return 0;
            }
            count++;
        }
        return -1;
    }

    clone(): Backpack {
        let newer: Backpack = new Backpack([]);
        let count: number = 0;

        while (count < this.abilities.length) {
            newer.abilities.push(this.abilities[count]);
            count++;
        }
        return newer;
    }
    emptyBackpack(): void {
        this.abilities = [];
    }
    equals(object: Backpack): boolean {
        return object.abilities.length == this.abilities.length;
    }
    toString(): string {
        let strings: string = "[ ";
        let count: number = 0;

        while (count < this.abilities.length) {
            strings += this.abilities[count].toString();
            if (count < this.abilities.length - 1) {
                strings += " ";
            }
            count++;
        }
        strings += "]";
        return strings;
    }
}
