// std
import { useMemo } from "react";

// lib
import { FluxStandardAction, FluxStandardThunk } from "../types";
import { action as actionFactory } from "../helpers/action";
import { useGlobalState } from "./useGlobalState";

// useStore hook return type
type UseStoreAPI<
  S extends Record<string | symbol, Record<string, unknown>> = Record<
    string | symbol,
    Record<string, unknown>
  >,
> = {
  action: typeof actionFactory;
  state: S;
  dispatch(
    actionOrThunk: FluxStandardAction | FluxStandardThunk<S>,
  ): Promise<void> | void;
};

// useStore hook
export function useStore<
  S extends Record<string | symbol, Record<string, unknown>> = Record<
    string | symbol,
    Record<string, unknown>
  >,
>(): UseStoreAPI<S> {
  const { dispatchAction, state } = useGlobalState();
  return useMemo(
    () => ({
      action: actionFactory,
      dispatch: dispatchAction,
      state: state as S,
    }),
    [dispatchAction, state],
  );
}
