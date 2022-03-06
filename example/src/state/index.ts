import { combineModules } from "@ethicdevs/react-global-state-hooks";

import { AuthModule } from "./auth";

// Auto export everything needed for the Provider
export const { ActionTypes, rootReducer, initialState } = combineModules({
  auth: AuthModule
});
