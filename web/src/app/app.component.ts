import { Component, HostListener, OnInit, WritableSignal, signal } from "@angular/core";

import { NuiService } from "./nui.service";
import { ExampleContainerComponent } from "./example-container/example-container.component";

@Component({
    selector: "app-root",
    imports: [ExampleContainerComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
    // This listens for the "setVisible" message
    visible = this.nui.createWritableMessageActionSignal("setVisible");

    constructor(private nui: NuiService) {}

    ngOnInit(): void {
        // This will set the NUI to visible if we are developing in browser
        this.nui.dispatchDebugMessages([
            {
                action: "setVisible",
                data: true,
            },
        ]);
    }

    @HostListener("window:keydown", ["$event"])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (["Backspace", "Escape"].includes(event.code)) {
            if (!this.nui.isEnvBrowser()) this.nui.fetchNui("hideFrame");
            this.visible.set(false);
        }
    }
}
