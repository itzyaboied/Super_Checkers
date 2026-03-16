import {
    BindAttribute,
    BindStyle,
    BindStyleToNumberAppendPx,
    BindValue,
    WebzComponent,
} from "@boots-edu/webz";
import html from "./piece-view.component.html";
import css from "./piece-view.component.css";
import { Piece } from "../../game/elements/Piece";
import { PieceBlueHen } from "../../game/elements/PieceBlueHen";
import { PieceMinion } from "../../game/elements/PieceMinion";
import { PieceNeo } from "../../game/elements/PieceNeo";
import { Katerine } from "../../game/elements/PieceKaterineOfKislev";

export class PieceViewComponent extends WebzComponent {
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

    @BindAttribute("image", "src", (imgName: string): string => {
        return "assets/" + imgName;
    })
    public imgName: string = "blue_hen.png";

    @BindValue("abilities")
    private abilities: string = "Abilities: ";

    constructor(piece: Piece) {
        super(html, css);
        this.setImage(piece);
        this.abilities =
            (piece.isActive() ? "" : "Inactive: ") +
            this.abilities +
            piece.getBackpack().toString();
    }

    setImage(piece: Piece) {
        this.imageBackgroundColor = piece.getTeamColor();
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
