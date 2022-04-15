// std
import React, {
  FC,
  Reducer,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from "react";

// lib
import {
  DispatchLogger,
  FluxBaseState,
  FluxStandardAction,
  FluxStandardThunk,
  GlobalStateContextType,
  Logger,
  LoggerType,
  StateLogger,
} from "./types";
import { GlobalStateContext } from "./context";
import { action as actionFactory } from "./helpers/action";
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
  const lastStateRef = useRef<typeof initialState>(initialState);
  const getState = useCallback(() => lastStateRef.current, []);

  const enhancedRootReducer = useRef(
    (
      state: typeof initialState,
      action: FluxStandardAction,
    ): typeof initialState => {
      lastStateRef.current = rootReducer(state, action);
      if (getLoggerFn != null && typeof getLoggerFn === "function") {
        (getLoggerFn(LoggerType.State) as StateLogger).logState(
          lastStateRef.current,
        );
      }
      return lastStateRef.current;
    },
  ).current;

  const [state, dispatchAction] = useReducer<
    typeof enhancedRootReducer,
    typeof initialState
  >(enhancedRootReducer, initialState, () => initialState);

  const getLoggerFn = useMemo(
    () => (getLogger != null ? getLogger : getConsoleLogger),
    [getLogger],
  );

  const dispatch = useCallback(
    (
      actionOrThunk: FluxStandardAction | FluxStandardThunk,
    ): Promise<void> | void => {
      // if param is a promise, we have a thunk.
      if (typeof actionOrThunk === "function") {
        const thunk = actionOrThunk as FluxStandardThunk;
        return thunk(dispatch, actionFactory, initialState, getState);
      }
      // else, normal action,
      const action = actionOrThunk as FluxStandardAction;
      // log it,
      if (getLoggerFn != null && typeof getLoggerFn === "function") {
        (getLoggerFn(LoggerType.Dispatch) as DispatchLogger).logAction(action);
      }
      // then dispatch it.
      return dispatchAction(action);
    },
    [dispatchAction, getLoggerFn, getState],
  );

  const ctxValue = useMemo(
    () =>
      ({
        dispatchAction: dispatch,
        getLogger: getLoggerFn,
        getState: getState,
        state,
      } as GlobalStateContextType),
    [dispatch, getLoggerFn, getState, state],
  );

  return (
    <GlobalStateContext.Provider value={ctxValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};
