// std
import type { FC, Reducer } from "react";
import React, { useEffect, useMemo, useReducer } from "react";

// lib
import {
  FluxBaseState,
  FluxStandardAction,
  LoggerType,
  StateLogger,
} from "./types";
import { GlobalStateContext } from "./context";
import { getConsoleLogger } from "./helpers/consoleLogger";

type GlobalStateProviderProps = {
  initialState: FluxBaseState;
  rootReducer: Reducer<any, FluxStandardAction>;
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
      getLogger: getConsoleLogger,
    }),
    [dispatchAction, state],
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      (getConsoleLogger(LoggerType.State) as StateLogger).logState(state);
    }
  }, [state]);

  return (
    <GlobalStateContext.Provider value={ctxValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};
