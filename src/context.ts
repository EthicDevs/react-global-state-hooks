// std
import { createContext } from "react";

// lib
import type { GlobalStateContextType } from "./types";
import { getConsoleLogger } from "./helpers/consoleLogger";

export const INITIAL_GLOBAL_STATE_CONTEXT_VALUE: GlobalStateContextType = {
  state: {},
  dispatchAction() {
    return {};
  },
  // Default is a simple console logger that can be overridden from the Provider
  getLogger: getConsoleLogger,
};

export const GlobalStateContext = createContext<GlobalStateContextType>(
  INITIAL_GLOBAL_STATE_CONTEXT_VALUE,
);
