import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class NuiService {
	private resourceName: string = (window as any).GetParentResourceName
		? (window as any).GetParentResourceName()
		: "nui-app";

	constructor() {}

	isEnvBrowser(): boolean {
		return !(window as any).invokeNative;
	}
	
	async fetchNui<T = any>(eventName: string, data?: any, mockData?: T): Promise<T> {
        if (this.isEnvBrowser() && mockData) {
            return mockData;
        }
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(`https://${this.resourceName}/${eventName}`, options);
        return await response.json();
    }
}
