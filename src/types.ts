// std
import type { Dispatch, Reducer } from "react";
export type { Dispatch, Reducer } from "react";

// lib
export type FluxBaseState = { [key: string]: unknown };

export type FluxStandardAction<
  R = Record<string, unknown>,
  T = string,
  M = Record<string, unknown>
> = {
  payload?: R;
  type: T;
  metas?: M;
};

export type GlobalStateContextType<S extends Record<string, unknown>> = {
  dispatchAction: Dispatch<FluxStandardAction<any, string | symbol, any>>;
  state: S;
};

export type StateModule<S = Record<string, unknown>> = {
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
