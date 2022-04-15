// std
import type { Dispatch, Reducer } from "react";
export type { Dispatch, Reducer } from "react";

// lib
export type FluxBaseRecord = Record<string, unknown>;
export type FluxBaseState = { [key: string]: unknown };

export type FluxStandardAction<
  T extends string | symbol = string | symbol,
  R extends FluxBaseRecord = FluxBaseRecord,
  M extends FluxBaseRecord = FluxBaseRecord,
> = {
  payload?: R;
  type: T;
  metas?: M;
};

export type FluxStandardActionFactory<
  T extends string | symbol = string | symbol,
  R extends FluxBaseRecord = FluxBaseRecord,
  M extends FluxBaseRecord = FluxBaseRecord,
> = ({
  payload,
  type,
  metas,
}: {
  payload?: R;
  type: string;
  metas?: M;
}) => FluxStandardAction<T, R, M>;

export type FluxStandardThunk<S extends FluxBaseState = FluxBaseState> = (
  dispatch: (action: FluxStandardAction) => Promise<void> | void,
  action: FluxStandardActionFactory,
  getState: () => S,
  initialState: S,
) => Promise<void>;

export type ThunkGenerator = (...args: unknown[]) => FluxStandardAction;

export interface DispatchLogger {
  logAction(action: FluxStandardAction): void;
}

export interface StateLogger<S extends FluxBaseState = FluxBaseState> {
  logState(state: S): void;
}

export type Logger<S extends FluxBaseState = FluxBaseState> =
  | DispatchLogger
  | StateLogger<S>;

export enum LoggerType {
  Dispatch = "dispatch",
  State = "state",
}

export type GlobalStateContextType<
  S extends { [x: string]: FluxBaseState } = { [x: string]: FluxBaseState },
> = {
  dispatchAction: Dispatch<FluxStandardAction>;
  state: S;
  getLogger(type: LoggerType): Logger<S>;
  getState(): S;
};

export type StateModule<S = FluxBaseState> = {
  key: string;
  actionTypes: Readonly<Record<Readonly<string>, string>>;
  reducer: Reducer<S, any>;
  initialState: S;
};

export type CombineModulesReturn<I> = {
  ActionTypes: Readonly<Record<string | symbol, string>>;
  initialState: I;
  rootReducer: Reducer<I, any>;
};
