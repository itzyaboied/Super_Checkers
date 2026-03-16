import { BindValue, WebzComponent, WebzDialog } from "@boots-edu/webz";
import html from "./gui-view.component.html";
import css from "./gui-view.component.css";
import { Controller } from "../../Controller";
import { BoardViewComponent } from "../board-view/board-view.component";
import { BoardLocation } from "../../game/elements/BoardLocation";
import { ActionViewComponent } from "../action-view/action-view.component";
import { TeamComponent } from "../team/team.component";

export class GuiViewComponent extends WebzComponent {
    @BindValue("locations")
    private selectedSquares: string = "";

    private boardView: BoardViewComponent;
    private teamView1: TeamComponent;
    private teamView2: TeamComponent;

    // Part C Step 4
    private actionView: ActionViewComponent = new ActionViewComponent();
    // Part C Step 7
    private actionType: string = "";

    // Part D Step 1
    private startLocation: BoardLocation | null = null;
    private endLocation: BoardLocation | null = null;

    private controller: Controller = new Controller(4, 5);

    @BindValue("message")
    private message: string = "Start Game";

    constructor() {
        super(html, css);

        // Part B - Step 13 - #2
        this.boardView = new BoardViewComponent(
            this.controller.getGame().getGameBoard(),
        );
        // Part B - Step 33
        this.boardView.boardClicked.subscribe((location: BoardLocation) => {
            this.handleClicks(location);
        });
        this.addComponent(this.boardView, "board-view");
        // Part C Step 4
        this.addComponent(this.actionView, "action-view");

        // Part C Step 7
        this.actionView.cancelNotifier.subscribe((): void => {
            // this.handleClicks(actionType);
            this.reset();
        });

        for (let notifier of this.actionView.getNotifiers()) {
            notifier.subscribe((actionType: string): void => {
                this.handleClicks(actionType);
            });
        }

        this.teamView1 = new TeamComponent(
            this.controller.getGame().getCurrentTeam(),
        );
        this.addComponent(this.teamView1, "team1");
        this.teamView2 = new TeamComponent(
            this.controller.getGame().getOpponentTeam(),
        );
        this.addComponent(this.teamView2, "team2");
    }

    // Part C Step 8
    handleClicks(clicked: BoardLocation | string) {
        if (clicked instanceof BoardLocation) {
            if (!this.startLocation) {
                this.startLocation = clicked;
                this.selectedSquares =
                    "Start Square: " +
                    this.startLocation.getRow() +
                    ", " +
                    this.startLocation.getCol();
            } else if (!this.endLocation) {
                this.endLocation = clicked;
                this.selectedSquares +=
                    " End Square: " +
                    this.endLocation.getRow() +
                    ", " +
                    this.endLocation.getCol();
            } else if (this.actionType === "") {
                WebzDialog.popup(this, "Select an action");
                return;
            }
        } else if (this.actionType === "cancel") {
            this.reset();
            return;
        } else if (this.actionType === "") {
            this.actionType = clicked;
        }

        if (this.startLocation && this.actionType !== "") {
            if (!this.endLocation) {
                this.endLocation = new BoardLocation(-1, -1);
            }
            if (
                this.controller.carryOutAction(
                    this.actionType,
                    this.startLocation,
                    this.endLocation,
                )
            ) {
                this.boardView.redraw();
                this.teamView1.redraw(
                    this.controller.getGame().getCurrentTeam(),
                );
                this.teamView2.redraw(
                    this.controller.getGame().getOpponentTeam(),
                );

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
                        this.controller
                            .getGame()
                            .getCurrentTeam()
                            .getTeamColor() +
                        "'s turn.";
                }
            } else {
                WebzDialog.popup(
                    this,
                    this.controller.getGame().getRules().getMessage(),
                    "Invalid Action",
                );
            }

            this.reset();
        }
    }

    reset() {
        this.actionType = "";
        this.selectedSquares = "";
        this.startLocation = null;
        this.endLocation = null;
    }
}
