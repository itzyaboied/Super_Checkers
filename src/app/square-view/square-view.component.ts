import {
    BindAttribute,
    BindStyle,
    BindStyleToNumberAppendPx,
    BindVisibleToBoolean,
    Click,
    Notifier,
    WebzComponent,
} from "@boots-edu/webz";
import html from "./square-view.component.html";
import css from "./square-view.component.css";
import { BoardSquare } from "../../game/elements/BoardSquare";
import { BoardLocation } from "../../game/elements/BoardLocation";
import { PieceBlueHen } from "../../game/elements/PieceBlueHen";
import { PieceMinion } from "../../game/elements/PieceMinion";
import { PieceNeo } from "../../game/elements/PieceNeo";
import { Katerine } from "../../game/elements/PieceKaterineOfKislev";

export class SquareViewComponent extends WebzComponent {
    // Part B - Steps 3-5
    @BindStyle("square", "backgroundColor")
    private squareColor: string = "black";

    @BindStyleToNumberAppendPx("square", "width")
    @BindStyleToNumberAppendPx("square", "height")
    private squareSize: number = 50;

    @BindVisibleToBoolean("image")
    private hasImage: boolean = false;

    getSquareSize() {
        return this.squareSize;
    }

    // Part B - Step 20
    @BindAttribute("image", "src", (imgName: string): string => {
        return "assets/" + imgName;
    })
    public imgName: string = "blue_hen.png";

    // Part B - Step 21
    @BindStyle("image", "background")
    private imageBackgroundColor: string = "green";

    // Part B - Step 22
    @BindStyleToNumberAppendPx("image", "width")
    @BindStyleToNumberAppendPx("image", "height")
    private imageSize: number = 30;

    // Part B - Step 23
    @BindStyleToNumberAppendPx("image", "padding")
    private padding: number = 10;

    // Part B - Step 31
    clickedSquare: Notifier<BoardLocation> = new Notifier<BoardLocation>();

    constructor(
        private squareData: BoardSquare,
        private location: BoardLocation,
    ) {
        super(html, css);
        this.squareColor = squareData.getSquareColor();
        this.setImage(this.squareData);
    }

    // Part B Step 25
    setImage(squareData: BoardSquare) {
        // Part B Step 27
        if (squareData.isEmpty()) {
            this.imgName = "";
            this.hasImage = false;
        } else {
            this.hasImage = true;
            let piece = squareData.getPiece();
            if (piece) {
                this.imageBackgroundColor = piece.getTeamColor();
            }
            if (piece instanceof PieceBlueHen) {
                this.imgName = "blue_hen.png";
            } else if (piece instanceof PieceMinion) {
                this.imgName = "Minion.png";
            } else if (piece instanceof PieceNeo) {
                this.imgName = "neo.png";
            } else if (piece instanceof Katerine) {
                this.imgName = "Katerine.png";
            }
        }
    }

    @Click("square")
    onclick() {
        this.clickedSquare.notify(this.location);
    }
}
