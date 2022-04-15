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
  rootReducer: Reducer<FluxBaseState, FluxStandardAction>;
};

function isFluxStandardAction(
  actionOrThunk: FluxStandardAction | FluxStandardThunk,
): actionOrThunk is FluxStandardAction {
  return typeof actionOrThunk !== "function";
}
function isFluxStandardThunk(
  actionOrThunk: FluxStandardAction | FluxStandardThunk,
): actionOrThunk is FluxStandardThunk {
  return typeof actionOrThunk === "function";
}

export const GlobalStateProvider: FC<GlobalStateProviderProps> = ({
  children,
  initialState,
  getLogger,
  rootReducer,
}) => {
  const lastStateRef = useRef<typeof initialState>(initialState);
  const getState = useCallback(() => lastStateRef.current, []);

  const enhancedRootReducer = useRef(
    (prevState: FluxBaseState, action: FluxStandardAction): FluxBaseState => {
      lastStateRef.current = rootReducer(prevState, action);
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
    <AOT extends FluxStandardAction | FluxStandardThunk>(
      actionOrThunk: AOT,
    ): AOT extends FluxStandardThunk ? Promise<void> : void => {
      // if param is a promise, we have a thunk.
      if (isFluxStandardThunk(actionOrThunk)) {
        const thunk = actionOrThunk;
        // try to ensure order of execution is always correct
        return new Promise(async (resolve, reject) => {
          try {
            await thunk(dispatch, actionFactory, getState, initialState);
            return resolve(undefined);
          } catch (err) {
            return reject(err);
          }
        }) as any;
      } else if (isFluxStandardAction(actionOrThunk)) {
        // else, normal action,
        const action = actionOrThunk as FluxStandardAction;
        // log it,
        if (getLoggerFn != null && typeof getLoggerFn === "function") {
          (getLoggerFn(LoggerType.Dispatch) as DispatchLogger).logAction(
            action,
          );
        }
        // then dispatch it.
        return dispatchAction(action) as any;
      } else {
        return undefined as any;
      }
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
