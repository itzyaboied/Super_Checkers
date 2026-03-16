/*Problem 5
Represents the actions a player can take.

5.1 Create an abstract class named Action with the following:
- member field to represent your game  (type GameF25)
- member field to represent the action type (string)
- member field to represent the location of the start square
- constructor with three parameters that sets the member fields
5.2 An abstract method validAction with no parameters and returns a boolean
5.3 An abstract method performAction with no parameters and no return
*/

import { GameF25 } from "../elements/GameF25";
import { BoardLocation } from "../elements/BoardLocation";

export abstract class Action {
    protected game: GameF25;
    protected actionType: string;
    protected start: BoardLocation;

    constructor(game: GameF25, actionType: string, start: BoardLocation) {
        this.game = game;
        this.actionType = actionType;
        this.start = start;
    }

    // 5.2 Abstract method to check if the action is valid
    abstract validAction(): boolean;

    // 5.3 Abstract method to perform the action
    abstract performAction(): void;
}