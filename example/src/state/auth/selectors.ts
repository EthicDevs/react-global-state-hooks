import { FluxBaseState } from "@ethicdevs/react-global-state-hooks";

import { AuthState } from "./reducer";

type State = {
  [x: string]: FluxBaseState;
  auth: AuthState;
};

export const selectCurrentUser = (state: State) => {
  return state.auth.user;
};

export const selectIsAuthenticated = (state: State) => {
  return state.auth.authenticated;
};

export const selectIsAuthInProgress = (state: State) => {
  return state.auth.loading;
};

export const selectAuthErrorMessage = (state: State) => {
  return state.auth.errorMessage;
};
