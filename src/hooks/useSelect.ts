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
  S extends FluxBaseState,
  R extends unknown,
  K extends string = string,
>(selectors: Record<K, [(state: S) => R, MemoizeStateOptions | undefined]>) {
  const { getState } = useGlobalState();
  const lastState = getState();
  const manyValues = Object.entries(selectors)
    .map(([varLabel, s]) => {
      const [selector, memoizationOpts] = s as [
        (state: S) => R,
        MemoizeStateOptions | undefined,
      ];
      const fastSelector = memoize(selector, {
        ...defaultMemoizationOpts,
        ...(memoizationOpts || {}),
      });
      const val = fastSelector(lastState as S) as R;
      return {
        [varLabel]: val,
      };
    })
    .reduce(
      (acc, res) => {
        acc = { ...acc, ...res };
        return acc;
      },
      {} as {
        [x: string]: R;
      },
    );
  return useMemo(() => manyValues, [manyValues]);
}
