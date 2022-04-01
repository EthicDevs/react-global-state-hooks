/**
 * A factory function to make an action type ($prefix/$name)
 *
 * @example
 * // state/common/actionTypes.ts
 * export const ActionTypes = Object.freeze({
 *   RESET: actionType("RESET"),
 * });
 */
export function actionType<B extends string, P extends string = "core">(
  baseName: B,
  prefix?: P,
  joiner = "/",
): StandardActionType<B, P> {
  return [prefix, baseName].join(joiner) as unknown as StandardActionType<B, P>;
}

type StandardActionType<B extends string, P extends string> = {
  [K in `${B}`]: `${P}/${K}`;
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
export function makeActionType<B extends string, P extends string = "core">(
  baseName: B,
  prefix?: P,
): Record<B, StandardActionType<B, P>> {
  return {
    [baseName]: actionType(baseName, prefix),
  } as Record<B, StandardActionType<B, P>>;
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
export function makeThunkActionType<B extends string, P extends string>(
  baseName: B,
  prefix?: P,
): ThunkActionType<B, P> {
  return {
    [`${baseName}_${ThunkState.Request}`]: actionType(
      `${baseName}_REQUEST`,
      prefix as string,
    ),
    [`${baseName}_${ThunkState.Success}`]: actionType(
      `${baseName}_SUCCESS`,
      prefix as string,
    ),
    [`${baseName}_${ThunkState.Failure}`]: actionType(
      `${baseName}_FAILURE`,
      prefix as string,
    ),
  } as unknown as ThunkActionType<B, P>;
}

enum ThunkState {
  Request = "REQUEST",
  Success = "SUCCESS",
  Failure = "FAILURE",
}

type ThunkActionType<
  B extends string,
  K extends string,
  S extends ThunkState = ThunkState,
> = {
  [P in `${B}_${S}`]: `${K}/${P}`;
};
