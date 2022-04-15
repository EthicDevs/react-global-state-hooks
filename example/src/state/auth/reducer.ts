import { Reducer } from "react";
import {
  FluxBaseState,
  FluxStandardAction,
} from "@ethicdevs/react-global-state-hooks";

import { ActionType, ActionTypes } from "./actionTypes";

export type User = {
  id: string;
  name: string;
};

export interface AuthState extends FluxBaseState {
  authenticated: boolean;
  errorMessage: null | string;
  loading: boolean;
  user: User | null;
}

// Initial state
export const initialState: AuthState = {
  authenticated: false,
  errorMessage: null,
  loading: false,
  user: null,
};

export const reducer: Reducer<AuthState, FluxStandardAction<string>> = (
  state,
  action,
) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN_REQUEST: {
      return {
        ...state,
        authenticated: false,
        errorMessage: null,
        loading: true,
        user: null,
      };
    }
    case ActionTypes.SIGN_IN_SUCCESS: {
      const { user } = action.payload as { user: User };
      return {
        ...state,
        authenticated: true,
        errorMessage: null,
        loading: false,
        user,
      };
    }
    case ActionTypes.SIGN_IN_FAILURE: {
      const { errorMessage } = action.payload as { errorMessage: string };
      return {
        ...state,
        authenticated: false,
        errorMessage,
        loading: false,
        user: null,
      };
    }
    case ActionTypes.SIGN_OUT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionTypes.SIGN_OUT_FAILURE: {
      const { errorMessage } = action.payload as { errorMessage: string };
      return {
        ...state,
        errorMessage,
        loading: false,
      };
    }
    case ActionTypes.SIGN_OUT_SUCCESS:
    case ActionTypes.RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
