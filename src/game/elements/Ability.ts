/* HW 10 Problem 1 
Define a class named Ability that has:

1.1 Two member fields: 
 - string representing the description of the ability set to empty string by default
 - boolean representing whether this ability is available (or has expired) set to true
 - a constructor with these two parameters in the order above that sets these values
  
1.2 Two getters:
    getDescription, isAvailable

1.3 One setter for the available field
    setAvailable
    Note: description should not be changed anywhere outside this class definition

1.4 A clone method for this class that returns a deep copy of this object

1.5 An equals method that has one Ability parameter and returns a boolean. This
method compares the description. 
Two instances of Ability will be considered equivalent if their descriptions match.

1.6 A toString method that has no parameters and returns a string containing
the description. 
If the ability is available it should be followed by ":ready " otherwise
 it should be followed by ":expired ".
        example of an available ability:  "spawn:ready "
        example of an expired ability:  "steal:expired "
        

-You can test your class with Ability.test.ts
*/

export class Ability {
    private description: string =
        "(name:leadership)passive ability: adjacent pieces are unkillable(does not include caster).";
    protected executable: boolean = true;

    constructor(
        leadership: string = "(name:leadership)passive ability: adjacent pieces are unkillable(does not include caster).",
        executable: boolean = true,
    ) {
        this.description = leadership;
        this.executable = executable;
    }
    getDescription() {
        return this.description;
    }
    isAvailable() {
        return this.executable;
    }
    setAvailable(set: boolean): void {
        this.executable = set;
    }
    clone() {
        return new Ability(this.description, this.executable);
    }
    equals(power: Ability): boolean {
        return power.description == this.description;
    }
    toString() {
        if (this.executable) {
            return this.description + ":ready ";
        } else {
            return this.description + ":expired ";
        }
    }
}