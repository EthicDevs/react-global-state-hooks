// std
import memoize, { MemoizeStateOptions } from "memoize-state";
import { useMemo } from "react";

// lib
import type { FluxBaseState } from "../types";
import { useGlobalState } from "./useGlobalState";

export function useSelect<S extends FluxBaseState, R extends unknown>(
  selector: (state: S) => R,
  memoizationOpts: MemoizeStateOptions = { safe: true },
) {
  const { getState } = useGlobalState();
  const lastState = getState();
  const fastSelector = memoize(selector, memoizationOpts);
  const val = fastSelector(lastState as S) as R;
  return useMemo(() => val, [val]);
}
