// std
import { useCallback, useMemo } from "react";

// lib
import type { FluxStandardAction } from "../types";

import { action as actionFactory } from "../helpers/action";
import { useGlobalState } from "./useGlobalState";

// useStore hook return type
type UseStoreAPI<
  AT extends string | symbol = string | symbol,
  S extends Record<string | symbol, Record<string, unknown>> = Record<
    string | symbol,
    Record<string, unknown>
  >
> = {
  action: typeof actionFactory;
  state: S;
  dispatch(
    action: FluxStandardAction<
      Record<string, unknown>,
      AT,
      Record<string, unknown>
    >
  ): Promise<void> | void;
};

// useStore hook
export function useStore<
  AT extends string | symbol = string | symbol,
  S extends Record<string | symbol, Record<string, unknown>> = Record<
    string | symbol,
    Record<string, unknown>
  >
>(): UseStoreAPI<AT, S> {
  const { dispatchAction, state } = useGlobalState();

  const dispatch = useCallback(
    (
      action: FluxStandardAction<
        Record<string, unknown>,
        AT,
        Record<string, unknown>
      >
    ) => {
      const { type: t, payload, metas } = action;

      if (process.env.NODE_ENV === "development") {
        console.log(`[dispatch] ${String(t)} =>`, payload, metas);
      }

      return dispatchAction(action);
    },
    [dispatchAction]
  );

  return useMemo(
    () => ({
      action: actionFactory,
      dispatch,
      state: state as S,
    }),
    [dispatch, state]
  );
}
