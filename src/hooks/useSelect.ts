// std
import { useMemo } from "react";

// lib
import { useGlobalState } from "./useGlobalState";

export function useSelect<S extends Record<string, unknown>, R extends unknown>(
  selector: (state: S) => R
) {
  const { state } = useGlobalState();
  return useMemo(() => selector(state as S) as R, [selector, state]);
}
