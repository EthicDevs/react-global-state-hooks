import { actionType } from "@ethicdevs/react-global-state-hooks";

// Module key.
export const modKey = "auth";

// Types of actions for this module
export const ActionTypes = Object.freeze({
  RESET: actionType("RESET"),
  SIGN_IN_REQUEST: actionType("SIGN_IN_REQUEST", modKey),
  SIGN_IN_SUCCESS: actionType("SIGN_IN_SUCCESS", modKey),
  SIGN_IN_FAILURE: actionType("SIGN_IN_FAILURE", modKey),
  SIGN_OUT_REQUEST: actionType("SIGN_OUT_REQUEST", modKey),
  SIGN_OUT_SUCCESS: actionType("SIGN_OUT_SUCCESS", modKey),
  SIGN_OUT_FAILURE: actionType("SIGN_OUT_FAILURE", modKey),
});

export type ActionType = keyof typeof ActionTypes;
