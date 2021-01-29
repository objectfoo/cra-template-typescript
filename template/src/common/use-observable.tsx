import { useReducer, useLayoutEffect, useCallback, useRef, DependencyList } from "react";
import { Computed, ReadOnlyObservable } from "@residualeffect/reactor";

export function useObservable<T>(observable: ReadOnlyObservable<T>): T {
	const [, triggerReact] = useReducer((x) => x + 1, 0);
	useLayoutEffect(() => observable.Subscribe(triggerReact), [observable]);
	return observable.Value;
}

export function useComputed<T>(computeFunc: () => T, deps?: DependencyList): T {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const callback = useCallback(computeFunc, deps ?? []);
	const computed = useRef<Computed<T>|null>(null);
	if (computed.current === null || computed.current.ValueGenerator !== callback) {
		computed.current = new Computed(callback);
	}
	return useObservable(computed.current);
}
