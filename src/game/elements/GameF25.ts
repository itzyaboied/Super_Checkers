/*Problem 2:

2.1 Define a class named GameF25 that extends Game and 
represents the game that we build for our Homework 10 
this semester.
This class should have the following members:
- a member field for the Rules of this game
  - we will define this class in the next problem
- constructor with the same number of parameters as its
   superclass. It should:
   - call the super class constructor
   - set the rules to a new Rules object  
        new Rules(this);
        
2.2 An acessor method:
    - getRules 

2.3 Implement isGameEnded method
    - for our game - the game has ended when either one or both teams
        has no ACTIVE pieces left on their team

2.4 Implement getWinner method
    - for our game the winner is the one that still has ACTIVE pieces 
        left on their team after the game has eneded
        - if both teams have no pieces - return "Tie"

*/

/* Homework 10 - Part B
Problem 2
*/

import { Game } from "./Game";
import { Rules } from "./Rules";
import { Team } from "./Team";

export class GameF25 extends Game {
    private rules: Rules;
    private bluelife: boolean = true;
    private redlife: boolean = true;

    constructor(board: any, teamA: Team, teamB: Team, turn: string) {
        // Call superclass constructor
        super(board, teamA, teamB, turn);

        // Initialize the Rules object for this game
        this.rules = new Rules(this);
    }

    /** 2.2 Accessor for Rules */
    getRules(): Rules {
        return this.rules;
    }

    override changeTurn(): void {
        const CurrentActive = this.getCurrentTeam().filterPieces(true).length;

        let revolver: number = Math.floor(Math.random() * (15 + CurrentActive));
        let bullet: number = Math.floor(Math.random() * 15);

        if (revolver === bullet) {
            if (this.getCurrentTeam().getTeamColor() === "Red") {
                this.redlife = false;
            } else if (this.getCurrentTeam().getTeamColor() === "Blue") {
                this.bluelife = false;
            }
            for (
                let i = 0;
                i < this.getCurrentTeam().getAllPieces().length;
                i++
            ) {
                this.getCurrentTeam().getAllPieces()[i].setActive(false);
                console.log("revolver shot");
            }
        }

        this.rules.isLastOneStanding();
        super.changeTurn();
    }

    /** 2.3 isGameEnded
     *  The game ends when either team (or both) has no active pieces left.
     */
    isGameEnded(): boolean {
        const teamAActive = this.getCurrentTeam().filterPieces(true).length;
        const teamBActive = this.getOpponentTeam().filterPieces(true).length;

        // Game is over if either team runs out of active pieces
        return teamAActive === 0 || teamBActive === 0;
    }

    /** 2.4 getWinner
     *  Returns the winner's team color, or "Tie" if both teams have no active pieces.
     * NEW: Previous winning rule is kept but a specific russian game is added when only one piece is left on either team.
     */
    getWinner(): string {
        if (!this.redlife) {
            return "Blue";
        } else if (!this.bluelife) {
            return "Red";
        }
        return "tie";
    }
}
