/**
 * A factory function to make an action type ($prefix/$name)
 *
 * @example
 * // state/common/actionTypes.ts
 * export const ActionTypes = Object.freeze({
 *   RESET: actionType("RESET"),
 * });
 */
export function actionType(
  name: string,
  prefix = "core",
  joiner = "/",
): string {
  return [prefix, name].join(joiner) as string;
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
      prefix,
    ),
    [`${baseName}_${ThunkState.Success}`]: actionType(
      `${baseName}_SUCCESS`,
      prefix,
    ),
    [`${baseName}_${ThunkState.Failure}`]: actionType(
      `${baseName}_FAILURE`,
      prefix,
    ),
  } as ThunkActionType<B, P>;
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
