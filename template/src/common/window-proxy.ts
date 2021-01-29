export interface IWindowProxy {
	GoUri(uri: string): void;
	SetTimeout(callBackFunc: () => void, timeToWaitInMilliseconds: number): number;
	ClearTimeout(timeoutHandle: number): void;
}

export class WindowProxy implements IWindowProxy {
	public static get Instance(): WindowProxy {
		return WindowProxy._instance;
	}

	public GoUri(uri: string): void {
		window.location.href = uri;
	}

	public SetTimeout(callBackFunc: () => void, timeToWaitInMilliseconds: number): number {
		return window.setTimeout(callBackFunc, timeToWaitInMilliseconds);
	}

	public ClearTimeout(timeoutHandle: number): void {
		window.clearTimeout(timeoutHandle);
	}

	private static _instance: WindowProxy = new WindowProxy();
}
