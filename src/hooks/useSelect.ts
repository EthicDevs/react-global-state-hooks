// std
import { useMemo } from "react";

// lib
import type { FluxBaseState } from "../types";
import { useGlobalState } from "./useGlobalState";

export function useSelect<S extends FluxBaseState, R extends unknown>(
  selector: (state: S) => R,
) {
  const { getState, state } = useGlobalState();
  const lastState = getState();
  return useMemo(
    () => selector(lastState as S) as R,
    // magic bit here, use the return of the selector to prevent useless renders
    [selector, state, selector(lastState as S)],
  );
}
