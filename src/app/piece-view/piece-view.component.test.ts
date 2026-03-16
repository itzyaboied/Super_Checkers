import { describe, expect, test, beforeAll } from "@jest/globals";
import { PieceViewComponent } from "./piece-view.component";
import { bootstrap } from "@boots-edu/webz";

describe("PieceViewComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<PieceViewComponent>(PieceViewComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(PieceViewComponent);
        });
    });
});
