import { Component, WritableSignal, signal } from "@angular/core";
import { NuiService } from "../nui.service";

interface ReturnData {
	x: number;
	y: number;
	z: number;
}

@Component({
	selector: "app-example-container",
	templateUrl: "./example-container.component.html",
	styleUrls: ["./example-container.component.scss"],
})
export class ExampleContainerComponent {
	clientData: WritableSignal<ReturnData | null> = signal(null);

	constructor(private nui: NuiService) {}

	handleGetClientData() {
		this.nui
			.fetchNui<ReturnData>("getClientData")
			.then((retData) => {
				console.log("Got return data from client scripts:");
				console.dir(retData);
				this.clientData.set(retData);
			})
			.catch((e) => {
				console.error("Setting mock data due to error", e);
				this.clientData.set({ x: 500, y: 300, z: 200 });
			});
	}
}
