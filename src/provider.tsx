// std
import type { FC, Reducer } from "react";
import React, { useEffect, useMemo, useReducer } from "react";

// lib
import {
  FluxBaseState,
  FluxStandardAction,
  Logger,
  LoggerType,
  StateLogger,
} from "./types";
import { GlobalStateContext } from "./context";
import { getConsoleLogger } from "./helpers/consoleLogger";

type GlobalStateProviderProps = {
  initialState: FluxBaseState;
  getLogger?: (loggerType: LoggerType) => Logger;
  rootReducer: Reducer<any, FluxStandardAction>;
};

export const GlobalStateProvider: FC<GlobalStateProviderProps> = ({
  children,
  initialState,
  getLogger,
  rootReducer,
}) => {
  const [state, dispatchAction] = useReducer<
    typeof rootReducer,
    typeof initialState
  >(rootReducer, initialState, () => initialState);

  const getLoggerFn = useMemo(
    () => (getLogger != null ? getLogger : getConsoleLogger),
    [getLogger],
  );

  const ctxValue = useMemo(
    () => ({
      dispatchAction,
      state,
      getLogger: getLoggerFn,
    }),
    [dispatchAction, state],
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      (getLoggerFn(LoggerType.State) as StateLogger).logState(state);
    }
  }, [state, getLoggerFn]);

  return (
    <GlobalStateContext.Provider value={ctxValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};
