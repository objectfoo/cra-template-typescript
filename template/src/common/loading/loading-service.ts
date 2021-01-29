import { Computed, Observable } from "@residualeffect/reactor";

export enum LoadingState {
	Loading = "Loading",
	Error = "Error",
	Loaded = "Loaded",
}

export class LoadingService {
	constructor() {
		this.IsLoading = new Observable(false);
		this.LoadErrorMessage = new Observable("");

		this.State = new Computed(() => {
			if (this.LoadErrorMessage.Value.length > 0) {
				return LoadingState.Error;
			}
			if (this.IsLoading.Value) {
				return LoadingState.Loading;
			}
			return LoadingState.Loaded;
		});

		this.A11yMessage = new Computed(() => {
			if (this.LoadErrorMessage.Value.length > 0) {
				return "An error has occured.";
			}
			if (this.IsLoading.Value) {
				return "Loading";
			}
			return "";
		});
	}

	public SyncDomState(isLoading: boolean, errorMessage: string): void {
		this.IsLoading.Value = isLoading;
		this.LoadErrorMessage.Value = errorMessage;
	}

	public IsLoading: Observable<boolean>;
	public LoadErrorMessage: Observable<string>;
	public State: Computed<LoadingState>;
	public A11yMessage:Computed<string>;
}
