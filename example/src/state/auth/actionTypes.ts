import {
  makeActionType,
  makeThunkActionType,
} from "@ethicdevs/react-global-state-hooks";

// Module key.
export const modKey = "auth";

// Types of actions for this module
export const ActionTypes = Object.freeze({
  ...makeActionType("RESET"),
  ...makeThunkActionType("SIGN_IN", modKey),
  ...makeThunkActionType("SIGN_OUT", modKey),
});

export type ActionType = keyof typeof ActionTypes;
