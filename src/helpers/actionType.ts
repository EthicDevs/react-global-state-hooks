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
export function makeThunkActionType(baseName: string, prefix?: string) {
  return {
    [`${baseName}_REQUEST`]: actionType(`${baseName}_REQUEST`, prefix),
    [`${baseName}_SUCCESS`]: actionType(`${baseName}_SUCCESS`, prefix),
    [`${baseName}_FAILURE`]: actionType(`${baseName}_FAILURE`, prefix),
  };
}
