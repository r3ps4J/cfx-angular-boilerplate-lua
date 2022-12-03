import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { ExampleContainerComponent } from "./example-container/example-container.component";

@NgModule({
	declarations: [
		AppComponent,
		ExampleContainerComponent
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
