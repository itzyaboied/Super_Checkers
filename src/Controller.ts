/*Problem 13: [15 points] - This class will be graded manually by the TAs

13.1 Define a class named Controller. 
This class will interact with the game elements and actions,
and the view used to capture user input.
It should have the following members:
- member field to represnt the game - GameFS25 object
- member field abilityOptions string array - already given - 
    which represents the description of the abilities
    that can go into the backpacks
- constructor with two parameters:
    - number of rows for the gameboard
    - number of columns for the gameboard
    - calls createGame and assigns it’s return value to the GameFS25 property
            (you will define this method in next step)

13.2 A method named createGame has two parameters: number of rows and number of columns
    and returns a GameF25 object
    this method should create a GameF25 with the following:
        - the GameBoard property should have the number of rows and columns passed in
        - the teamA object:
            - the color of the team is your choice (don't choose black or white) 
            - it should have 3 Piece objects: 
                    a PieceBluehen, a PieceMinion, a PieceNeo
                    - each Piece should have a backpack
                    - each backpack should be created with a random number 
                        of abilities - between [0-3] (inclusive)
                        and the abilities should be randomly selected from the
                        abilityOptions member field
        - the teamB object:
            - the color of the team is your choice (don't choose black or white or color of teamA) 
            - it should have 3 Piece objects: 
                    a PieceBluehen, a PieceMinion, a PieceNeo
                    - each Piece should have a backpack
                    - each backpack should be created with a random number 
                        of abilities - between [0-3] (inclusive)
                        and the abilities should be randomly selected from the
                        abilityOptions member field
        - the turn should be set to the color of teamA

    -Note: you can create helper functions as you see fit
        - I strongly recommend you define a createABackpack method that
            creates an instance of a Backpack and loads it with the random number
            of randomly selected abilities.
13.3 Acccessor methods:
    - getGame, getAbilityOptions

13.4 An accessor method getTurn 
    has no parameters and returns a string
    indicating the color of the team whose turn it is.
    Format is not being tested but it should be similar to:
      "It's Blue Team's turn."

13.5 A method carryOutAction that three parameters in this order:
    - a string for action type and a start square location andn end square location
    - this method should TRY to create the appropriate action based on action type:       
    
        "move" -> ActionMove
        "attack" -> ActionAttack
        "recruit" -> ActionRecruit
        "spawn" -> ActionSpawn
        "swap" -> ActionSwapBP
        "escape" -> ActionEscape
        "resurrect -> ActionResurrect  

      if creating the action throws an error it should catch it and log the error to the
      console and return false

    - if the action is valid - it should perform the action
        (use your methods created in the Action classes!) and return true 

Once you have finished this method, you should be able to use: 
    npm run start 
to play your game with a text based interface.
Play your game to check if it is behaving as described in class.
*/

import { GameF25 } from "./game/elements/GameF25";
import { GameBoard } from "./game/elements/GameBoard";
import { Team } from "./game/elements/Team";
import { Piece } from "./game/elements/Piece";
import { PieceBlueHen } from "./game/elements/PieceBlueHen";
import { PieceMinion } from "./game/elements/PieceMinion";
import { PieceNeo } from "./game/elements/PieceNeo";
import { Backpack } from "./game/elements/Backpack";
import { Ability } from "./game/elements/Ability";
import { BoardLocation } from "./game/elements/BoardLocation";
import { ActionMove } from "./game/actions/ActionMove";
import { ActionAttack } from "./game/actions/ActionAttack";
import { ActionRecruit } from "./game/actions/ActionRecruit";
import { ActionSpawn } from "./game/actions/ActionSpawn";
import { ActionSwapBP } from "./game/actions/ActionSwapBP";
import { ActionEscape } from "./game/actions/ActionEscape";
import { ActionResurrect } from "./game/actions/ActionResurrect";
import { ActionError } from "./game/ActionError";
import { Katerine } from "./game/elements/PieceKaterineOfKislev";
import { Charge } from "./game/actions/ActionCharge";
export class Controller {
    private game: GameF25;
    private abilityOptions: string[] = [
        "spawn",
        "swap",
        "steal",
        "heal",
        "boost",
        "charge",
        "attack",
    ];
    private random_rows: number = 0;
    private random_cols: number = 0;

    constructor(rows: number, cols: number) {
        this.game = this.createGame(rows, cols);
    }

    // 13.2 - create the game
    private createGame(rows: number, cols: number): GameF25 {
        const board = new GameBoard(rows, cols);
        this.random_rows = Math.floor(Math.random() * board.getNumRows());
        this.random_cols = Math.floor(Math.random() * board.getNumColumns());

        const teamAColor = "Red";
        const teamBColor = "Blue";

        const teamAPieces: Piece[] = [
            new PieceBlueHen(
                "H",
                teamAColor,
                false,
                this.createABackpack(),
                true,
            ),
            new PieceMinion(
                "M",
                teamAColor,
                false,
                this.createABackpack(),
                true,
            ),
            new PieceNeo(
                "N",
                teamAColor,
                true,
                this.createABackpack(),
                true,
                0, // numAttacks
                0, // numRecruits
            ),
            new Katerine("K", teamAColor, true, this.createABackpack(), true),
        ];

        const teamBPieces: Piece[] = [
            new PieceBlueHen(
                "H",
                teamBColor,
                false,
                this.createABackpack(),
                true,
            ),
            new PieceMinion(
                "M",
                teamBColor,
                false,
                this.createABackpack(),
                true,
            ),
            new PieceNeo(
                "N",
                teamBColor,
                true,
                this.createABackpack(),
                true,
                0,
                0,
            ),
        ];

        const teamA = new Team(teamAColor, teamAPieces);
        const teamB = new Team(teamBColor, teamBPieces);

        return new GameF25(board, teamA, teamB, teamAColor);
    }
    // Helper to create a random backpack
    private createABackpack(): Backpack {
        const numAbilities = Math.floor(Math.random() * 4); // 0-3 inclusive
        const selectedAbilities: Ability[] = [];
        for (let i = 0; i < numAbilities; i++) {
            const randomIndex = Math.floor(
                Math.random() * this.abilityOptions.length,
            );
            selectedAbilities.push(
                new Ability(this.abilityOptions[randomIndex]),
            );
        }
        return new Backpack(selectedAbilities);
    }

    // 13.3 - accessors
    getGame(): GameF25 {
        return this.game;
    }

    getAbilityOptions(): string[] {
        return this.abilityOptions;
    }

    // 13.4 - accessor for turn
    getTurn(): string {
        return `It's ${this.game.getCurrentTeam().getTeamColor()} Team's turn.`;
    }

    // 13.5 - carry out an action
    carryOutAction(
        actionType: string,
        start: BoardLocation,
        end?: BoardLocation,
    ): boolean {
        try {
            let actionInstance: any;

            switch (actionType.toLowerCase()) {
                case "move":
                    if (!end)
                        throw new Error("End location required for move.");
                    actionInstance = new ActionMove(this.game, start, end);
                    break;
                case "attack":
                    if (!end)
                        throw new Error("End location required for attack.");
                    actionInstance = new ActionAttack(this.game, start, end);
                    break;
                case "recruit":
                    if (!end)
                        throw new Error("End location required for recruit.");
                    actionInstance = new ActionRecruit(this.game, start, end);
                    break;
                case "spawn":
                    actionInstance = new ActionSpawn(this.game, start);
                    break;
                case "swap":
                    if (!end)
                        throw new Error("End location required for swap.");
                    actionInstance = new ActionSwapBP(this.game, start, end);
                    break;
                case "escape":
                    actionInstance = new ActionEscape(this.game, start);
                    break;
                case "resurrect":
                    actionInstance = new ActionResurrect(this.game, start);
                    break;
                case "charge":
                    if (!end)
                        throw new Error("End location required for charge.");
                    actionInstance = new Charge(this.game, start, end);
                    break;
                default:
                    console.error("Unknown action type:", actionType);
                    return false;
            }

            actionInstance.performAction();
            const board = this.game.getGameBoard();

            board.pithole(this.random_rows, this.random_cols);
            return true;
        } catch (err) {
            if (err instanceof ActionError) {
                console.error(
                    `ActionError [${err.actionType}]: ${err.message}`,
                );
            } else {
                console.error(err);
            }
            return false;
        }
    }
}
