/**
 * A factory function to make an action type ($prefix/$name)
 *
 * @example
 * // state/common/actionTypes.ts
 * export const ActionTypes = Object.freeze({
 *   RESET: actionType("RESET"),
 * });
 */
export function actionType<
  B extends string,
  P extends string = "core",
  J extends string = "/",
>(baseName: B, prefix?: P, joiner?: J): ActionType<B, P, J> {
  const aType = [prefix, baseName].join(joiner || "/");
  return aType as unknown as ActionType<B, P, J>;
}

type ActionType<B extends string, P extends string, J extends string> = {
  this: `${P}${J}${B}`;
};
type StandardActionType<B extends string, P extends string, J extends string> =
  {
    [K in `${B}`]: `${P}${J}${K}`;
  };

/**
 * A factory function to make an object of action type
 * to be rest-spread'ed into the ActionTypes of a module.
 *
 * @example
 * // state/auth/actionTypes.ts
 * export const ActionTypes = Object.freeze({
 *   ...makeActionType("SET_USERNAME", modKey),
 * });
 */
export function makeActionType<
  B extends string,
  P extends string = "core",
  J extends string = "/",
>(baseName: B, prefix?: P, joiner?: J): StandardActionType<B, P, J> {
  return {
    [baseName]: actionType(baseName, prefix, joiner),
  } as unknown as StandardActionType<B, P, J>;
}

/**
 * A factory function to make an object of thunk/async action types
 * to be rest-spread'ed into the ActionTypes of a module.
 *
 * @example
 * // state/auth/actionTypes.ts
 * export const ActionTypes = Object.freeze({
 *   ...makeThunkActionType("SIGN_IN", modKey),
 *   ...makeThunkActionType("SIGN_OUT", modKey),
 * });
 */
export function makeThunkActionType<
  B extends string,
  P extends string = "core",
  J extends string = "/",
>(baseName: B, prefix?: P, joiner?: J): ThunkActionType<B, P, J> {
  return {
    [`${baseName}_${ThunkState.Request}`]: actionType(
      `${baseName}_REQUEST`,
      prefix as string,
      joiner,
    ),
    [`${baseName}_${ThunkState.Success}`]: actionType(
      `${baseName}_SUCCESS`,
      prefix as string,
      joiner,
    ),
    [`${baseName}_${ThunkState.Failure}`]: actionType(
      `${baseName}_FAILURE`,
      prefix as string,
      joiner,
    ),
  } as unknown as ThunkActionType<B, P, J>;
}

enum ThunkState {
  Request = "REQUEST",
  Success = "SUCCESS",
  Failure = "FAILURE",
}

type ThunkActionType<
  B extends string,
  K extends string,
  J extends string,
  S extends ThunkState = ThunkState,
> = {
  [P in `${B}_${S}`]: `${K}${J}${P}`;
};
