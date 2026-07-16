import { isDevMode, Service, signal, Signal, WritableSignal } from "@angular/core";
import { fromEvent, Observable, Subject } from "rxjs";

interface NuiMessage<T = any> {
    action: string;
    data: T;
}

@Service()
export class NuiService {
    private resourceName: string = (window as any).GetParentResourceName
        ? (window as any).GetParentResourceName()
        : "nui-app";

    private messageObservable: Observable<MessageEvent>;
    private actionObservables: Record<string, Subject<any>> = {};
    private actionSignals: Record<string, WritableSignal<any>> = {};

    constructor() {
        this.messageObservable = fromEvent<MessageEvent<NuiMessage>>(window, "message");
        this.messageObservable.subscribe((event: MessageEvent<NuiMessage>) => {
            if (this.actionObservables[event.data.action]) {
                this.actionObservables[event.data.action].next(event.data.data);
            }
            if (this.actionSignals[event.data.action]) {
                this.actionSignals[event.data.action].set(event.data.data);
            }
        });
    }

    public isEnvBrowser(): boolean {
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

    public fromMessageAction<T = any>(action: string): Subject<T> {
        if (!this.actionObservables[action]) {
            this.actionObservables[action] = new Subject<T>();
        }
        return this.actionObservables[action];
    }

    public createWritableMessageActionSignal<T = any>(action: string, initialValue?: T): WritableSignal<T> {
        if (!this.actionSignals[action]) {
            this.actionSignals[action] = signal<T | undefined>(initialValue);
        }
        return this.actionSignals[action];
    }

    public createMessageActionSignal<T = any>(action: string, initialValue?: T): Signal<T> {
        return this.createWritableMessageActionSignal(action, initialValue).asReadonly();
    }

    public dispatchDebugMessages<P>(events: NuiMessage<P>[], timeout = 1000): void {
        if (isDevMode() && this.isEnvBrowser()) {
            for (const event of events) {
                setTimeout(() => {
                    window.dispatchEvent(new MessageEvent("message", { data: event }));
                }, timeout);
            }
        }
    }
}
