# FiveM Angular and Lua Boilerplate

This repository is a basic boilerplate for getting started with Angular in NUI. It contains several helpful utilities and was generated with the [Angular CLI](https://github.com/angular/angular-cli). The project is set up with SCSS as stylesheet format. It is for both browser and in-game based development workflows.

For in-game workflows, run `npm run watch` which will watch the files and build the application upon changes.

This version of the boilerplate is meant for the CfxLua runtime, but should work with other languages if you copy over the `web` folder and the required `fxmanifest.lua` entries.

This boilerplate was heavily inspired by the [React boilerplate](https://github.com/project-error/fivem-react-boilerplate-lua) made by Project Error.

## Requirements

-   [Node ^18.13.0 || ^20.9.0](https://nodejs.org/en/)

_A basic understanding of the modern web development workflow. If you don't know this yet, Angular will not be for you. To get started with Angular go to https://angular.io/start._

## Getting Started

First clone the repository or use the template option and place it within your `resources` folder

### Installation

Install dependencies by navigating to the `web` folder within a terminal of your choice and type `npm i`.

## Features

This boilerplate comes with some utilities and examples to work off of.

### Lua Utils

**SendAngularMessage**

This is a small wrapper for dispatching NUI messages. This is designed to be used with the `fromMessageAction` function of the NuiService in Angular.

Signature

```lua
---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
SendAngularMessage(action, data)
```

Usage

```lua
SendAngularMessage("setVisible", true)
```

**debugPrint**

A debug printing utility that is dependent on a convar,
if the convar is set this will print out to the console.

The convar is dependent on the name given to the resource.
It follows this format `YOUR_RESOURCE_NAME-debugMode`

To turn on debugMode add `setr YOUR_RESOURCE_NAME-debugMode 1` to
your server.cfg or use the `setr` console command instead.

Signature (Replicates `print`)

```lua
---@param ... any[] The arguments you wish to send
debugPrint(...)
```

Usage

```lua
debugPrint("Is Angular better than React?", true, someOtherVar)
```

### Angular Utils

Signatures are not included for these utilities as the type definitions are sufficient enough.

**fromMessageAction**

This function returns a subject which can be subscribed to to receive updates for a certain action. This is the primary way of creating passive listeners.

_Note: You can register as many observers for the same action as you want._

**Usage**

```ts
export class MyComponent implements OnInit {
	count: WritableSignal<number> = signal(0);

	constructor(private nui: NuiService) {}

	ngOnInit(): void {
		// This listens for the "setCount" message
		this.nui.fromMessageAction<number>("setCount").subscribe({
			next: (value) => {
				// Do whatever logic you want here
				this.count.set(value);
			}
		});
	}
}
```

**getLastMessageData**

This function returns the last data received for a certain action. Useful when a component is rendered after the event has been dispatched but still needs that data (i.e. an application on a phone which gets updated by a loop).

**Usage**

```ts
export class MyComponent {
    constructor(private data: DataService) {
        let lastData = this.data.getLastMessageData<Player>("updatePlayer");
        if (lastData) {
            this.player = lastData;
        }
    }
}
```

**fetchNui**

This is a simple NUI focused wrapper around the standard `fetch` API. This is the main way to accomplish active NUI data fetching or to trigger NUI callbacks in the game scripts.

When using this, you should always at least callback using `{}` in the gamescripts.

_This can be heavily customized to your use case_

**Usage**

```ts
// First argument is the callback event name.
this.nui.fetchNui<ReturnData>("getClientData")
	.then((retData) => {
		console.log("Got return data from client scripts:");
		console.dir(retData);
		setClientData(retData);
	})
	.catch((e) => {
		console.error("Setting mock data due to error", e);
		setClientData({ x: 500, y: 300, z: 200 });
	});
```

**dispatchDebugMessage**

This is a function allowing for mocking dispatched game script actions in a browser environment. It will trigger `fromMessageAction` handlers as if they were dispatched by the game scripts. **It will only fire if the current environment is a regular browser and not CEF**

**Usage**

```ts
// This will target the fromMessageAction observers registered with `setVisible`
// and pass them the data of `true`
this.nui.dispatchDebugMessages([
	{
		action: "setVisible",
		data: true
	}
]);
```

**Misc Utils**

These are small but useful included utilities.

-   `this.nui.isEnvBrowser()` - Will return a boolean indicating if the current
    environment is a regular browser. (Useful for logic in development)

## Development Workflow

This boilerplate was designed with development workflow in mind. It includes some helpful scripts to accomplish that.

**Hot Builds In-Game**

When developing in-game, it's best to use `npm run watch`. This is similar to `ng serve`, but it builds the application. Meaning all that is required is a resource restart to update the game script.

**Usage**

```sh
npm run watch
```

**Production Builds**

When you are done with development phase for your resource. You must create a production build that is optimized and minimized.

You can do this by running the following:

```sh
npm run build
```

## Additional Notes

If you want to contact me or require help you could join my [discord server](https://discord.gg/bEWmBbg), I can't guarantee that I will be able to help you.
