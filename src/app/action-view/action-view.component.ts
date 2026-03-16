import { Click, Notifier, WebzComponent } from "@boots-edu/webz";
import html from "./action-view.component.html";
import css from "./action-view.component.css";

export class ActionViewComponent extends WebzComponent {
    // Notifier for Cancel button
    cancelNotifier: Notifier = new Notifier();

    // Notifier for all other Actions
    moveNotifier: Notifier<string> = new Notifier<string>();
    attackNotifier: Notifier<string> = new Notifier<string>();
    recruitNotifier: Notifier<string> = new Notifier<string>();
    spawnNotifier: Notifier<string> = new Notifier<string>();
    swapNotifier: Notifier<string> = new Notifier<string>();
    escapeNotifier: Notifier<string> = new Notifier<string>();
    resurrectNotifier: Notifier<string> = new Notifier<string>();
    chargeNotifier: Notifier<string> = new Notifier<string>();

    // Notifier array
    private actionNotifiers: Notifier<string>[] = [
        this.moveNotifier,
        this.attackNotifier,
        this.recruitNotifier,
        this.spawnNotifier,
        this.swapNotifier,
        this.escapeNotifier,
        this.resurrectNotifier,
        this.chargeNotifier,
    ];

    constructor() {
        super(html, css);
    }

    getNotifiers(): Notifier<string>[] {
        return this.actionNotifiers;
    }

    @Click("cancel")
    onCancel() {
        this.cancelNotifier.notify();
    }

    @Click("move")
    onMove() {
        this.moveNotifier.notify("move");
    }

    @Click("attack")
    onAttack() {
        this.attackNotifier.notify("attack");
    }

    @Click("recruit")
    onRecruit() {
        this.recruitNotifier.notify("recruit");
    }

    @Click("spawn")
    onSpawn() {
        this.spawnNotifier.notify("spawn");
    }
    @Click("swap")
    onSwap() {
        this.swapNotifier.notify("swap");
    }

    @Click("resurrect")
    onResurrect() {
        this.resurrectNotifier.notify("resurrect");
    }

    @Click("escape")
    onEscape() {
        this.escapeNotifier.notify("escape");
    }
    @Click("charge")
    onCharge() {
        this.chargeNotifier.notify("charge");
    }
}
