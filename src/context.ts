// std
import { createContext } from "react";

// lib
import type { GlobalStateContextType } from "./types";

export const INITIAL_GLOBAL_STATE_CONTEXT_VALUE: GlobalStateContextType<
  Record<string, unknown>
> = {
  dispatchAction() {
    return {};
  },
  state: {},
};

export const GlobalStateContext = createContext<
  GlobalStateContextType<Record<string, unknown>>
>(INITIAL_GLOBAL_STATE_CONTEXT_VALUE);
