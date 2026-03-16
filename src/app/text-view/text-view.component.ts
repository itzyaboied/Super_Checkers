import {
    BindValue,
    BindValueToNumber,
    Change,
    Click,
    Input,
    ValueEvent,
    WebzComponent,
    WebzDialog,
} from "@boots-edu/webz";
import html from "./text-view.component.html";
import css from "./text-view.component.css";
import { Controller } from "../../Controller";
import { BoardLocation } from "../../game/elements/BoardLocation";

export class TextViewComponent extends WebzComponent {
    @BindValueToNumber("start-row")
    private startRow: number = 0;

    @BindValueToNumber("start-col")
    private startCol: number = 0;

    @BindValueToNumber("end-row")
    private endRow: number = 0;

    @BindValueToNumber("end-col")
    private endCol: number = 0;

    @BindValue("operation-select")
    operationSelect: string = "move";

    @BindValue("message")
    private message: string = "Start Game";

    @BindValue("game-board")
    private gameString: string = "Board Goes Here";

    @BindValue("teams")
    private teamsString: string = "Teams Go Here";

    private controller: Controller = new Controller(4, 5);

    constructor() {
        super(html, css);
        // set the string representation of the game board
        this.displayGame();
        this.message = "Ready to Play! " + this.controller.getTurn();
    }

    // Events - when user enters values in the textboxes
    @Input("start-row")
    onStartRowChange(evt: ValueEvent) {
        this.startRow = +evt.value;
    }

    @Input("start-col")
    onStartColChange(evt: ValueEvent) {
        this.startCol = +evt.value;
    }

    @Input("end-row")
    onEndRowChange(evt: ValueEvent) {
        this.endRow = +evt.value;
    }

    @Input("end-col")
    onEndColChange(evt: ValueEvent) {
        this.endCol = +evt.value;
    }
    // Event - when user makes selection from selection box
    @Change("operation-select")
    onOperationSelectChange(event: ValueEvent) {
        this.operationSelect = event.value;
    }

    // Event - when user clicks Go button
    @Click("go")
    onGo() {
        if (
            this.controller.carryOutAction(
                this.operationSelect,
                new BoardLocation(this.startRow, this.startCol),
                new BoardLocation(this.endRow, this.endCol),
            )
        ) {
            // Update the 'View' with the current status
            // of the game
            // set the string representation of the game board
            this.displayGame();
            // Display whether Game is Over
            if (this.controller.getGame().isGameEnded()) {
                WebzDialog.popup(
                    this,
                    "Game Over! Congratulations " +
                        this.controller.getGame().getWinner() +
                        "!",
                );
            } else {
                this.message =
                    "It is Team " +
                    this.controller.getGame().getCurrentTeam().getTeamColor() +
                    "'s turn.";
            }
        } else {
            WebzDialog.popup(
                this,
                this.controller.getGame().getRules().getMessage(),
                "Invalid Action",
            );
        }
    }

    displayGame(): void {
        //this.gameString = this.controller.getGame().toString();
        this.gameString = this.controller.getGame().getGameBoard().toString();
        this.teamsString =
            this.controller.getGame().getCurrentTeam().toString() +
            "\n" +
            this.controller.getGame().getOpponentTeam().toString();
    }
}
