import { StateModule } from "@ethicdevs/react-global-state-hooks";

import type { AuthState } from "./reducer";
import { initialState, reducer } from "./reducer";
import { ActionTypes, modKey } from "./actionTypes";

// re-exports selectors/action types for easy import in components
export * as actions from "./actions";
export * from "./actionTypes";
export * from "./selectors";

// export module for use in src/state/index.ts
export const AuthModule: StateModule<AuthState> = {
  key: modKey,
  actionTypes: ActionTypes,
  initialState,
  reducer,
};
