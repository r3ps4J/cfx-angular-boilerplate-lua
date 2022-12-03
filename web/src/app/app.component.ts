import { Component, OnInit } from "@angular/core";
import { NuiService } from "./nui.service";

interface ReturnData {
	x: number;
	y: number;
	z: number;
}

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	visible: boolean = false;
	clientData?: ReturnData;

	constructor(private nui: NuiService) {}

	ngOnInit(): void {
		// This listens for the "setVisible" message
		this.nui.fromMessageAction<boolean>("setVisible").subscribe({
			next: (value) => {
				this.visible = value;
			}
		});

		// This will set the NUI to visible if we are developing in browser
		this.nui.dispatchDebugMessage([
			{
				action: "setVisible",
				data: true
			}
		]);
	}

	handleGetClientData() {
		this.nui
			.fetchNui<ReturnData>("getClientData")
			.then((retData) => {
				console.log("Got return data from client scripts:");
				console.dir(retData);
				this.clientData = retData;
			})
			.catch((e) => {
				console.error("Setting mock data due to error", e);
				this.clientData = { x: 500, y: 300, z: 200 };
			});
	}
}
