// std
import type { FC, Reducer } from "react";
import React, { useEffect, useMemo, useReducer } from "react";

// lib
import type { FluxBaseState, FluxStandardAction } from "./types";
import { GlobalStateContext } from "./context";

type GlobalStateProviderProps = {
  initialState: FluxBaseState;
  rootReducer: Reducer<any, FluxStandardAction<any, string | symbol, any>>;
};

export const GlobalStateProvider: FC<GlobalStateProviderProps> = ({
  children,
  initialState,
  rootReducer,
}) => {
  const [state, dispatchAction] = useReducer<
    typeof rootReducer,
    typeof initialState
  >(rootReducer, initialState, () => initialState);

  const ctxValue = useMemo(
    () => ({
      dispatchAction,
      state,
    }),
    [dispatchAction, state]
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[state] =>`, state);
    }
  }, [state]);

  return (
    <GlobalStateContext.Provider value={ctxValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};
