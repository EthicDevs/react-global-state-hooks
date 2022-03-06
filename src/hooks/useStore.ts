// std
import { useCallback, useMemo } from "react";

// lib
import { DispatchLogger, FluxStandardAction, LoggerType } from "../types";

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
  dispatch(action: FluxStandardAction): Promise<void> | void;
};

// useStore hook
export function useStore<
  S extends Record<string | symbol, Record<string, unknown>> = Record<
    string | symbol,
    Record<string, unknown>
  >,
>(): UseStoreAPI<S> {
  const { dispatchAction, state, getLogger } = useGlobalState();

  const dispatch = useCallback(
    (action: FluxStandardAction) => {
      if (process.env.NODE_ENV === "development") {
        (getLogger(LoggerType.Dispatch) as DispatchLogger).logAction(action);
      }
      return dispatchAction(action);
    },
    [dispatchAction],
  );

  return useMemo(
    () => ({
      action: actionFactory,
      dispatch,
      state: state as S,
    }),
    [dispatch, state],
  );
}
