import { describe, expect, test, beforeAll } from "@jest/globals";
import { TeamComponent } from "./team.component";
import { bootstrap } from "@boots-edu/webz";

describe("TeamComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<TeamComponent>(TeamComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(TeamComponent);
        });
    });
});
