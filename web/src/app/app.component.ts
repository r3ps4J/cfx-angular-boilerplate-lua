import { Component, HostListener, OnInit } from "@angular/core";
import { NuiService } from "./nui.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	visible: boolean = false;

	constructor(private nui: NuiService) {}

	ngOnInit(): void {
		// This listens for the "setVisible" message
		this.nui.fromMessageAction<boolean>("setVisible").subscribe({
			next: (value) => {
				this.visible = value;
			}
		});

		// This will set the NUI to visible if we are developing in browser
		this.nui.dispatchDebugMessages([
			{
				action: "setVisible",
				data: true
			}
		]);
	}

	@HostListener("window:keydown", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (["Backspace", "Escape"].includes(event.code)) {
			if (!this.nui.isEnvBrowser()) this.nui.fetchNui("hideFrame");
			this.visible = false;
		}
	}
}
