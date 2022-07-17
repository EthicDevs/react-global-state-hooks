// std
import memoize, { MemoizeStateOptions } from "memoize-state";
import { useMemo } from "react";

// lib
import type { FluxBaseState } from "../types";
import { useGlobalState } from "./useGlobalState";

const defaultMemoizationOpts = { safe: true };

export function useSelect<S extends FluxBaseState, R extends unknown>(
  selector: (state: S) => R,
  memoizationOpts: MemoizeStateOptions = defaultMemoizationOpts,
) {
  const { getState } = useGlobalState();
  const lastState = getState();
  const fastSelector = memoize(selector, memoizationOpts);
  const val = fastSelector(lastState as S) as R;
  return useMemo(() => val, [val]);
}

export function useManySelect<
  State extends FluxBaseState,
  SelectorValues extends {} = {},
  Selectors = {
    [K in keyof SelectorValues]: (state: State) => SelectorValues[K];
  },
  SelectorsResults = {
    [P in keyof SelectorValues]: ReturnType<
      (state: State) => SelectorValues[P]
    >;
  },
  T = {},
>(
  selectors: Selectors,
  memoizationOpts: MemoizeStateOptions = defaultMemoizationOpts,
): SelectorsResults {
  const { getState } = useGlobalState();
  const lastState = getState() as State;
  const manyValues = Object.entries(selectors).reduce(
    (acc, [key, selectorFn]: [string, (state: State) => T]) => {
      const fastSelector = memoize(selectorFn, memoizationOpts);
      acc = { ...acc, [key]: fastSelector(lastState) };
      return acc;
    },
    {} as SelectorsResults,
  );
  return useMemo(() => manyValues, [manyValues]);
}
