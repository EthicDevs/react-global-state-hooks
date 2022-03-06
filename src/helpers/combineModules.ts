import { CombineModulesReturn, Reducer, StateModule } from "../types";

// A factory to make a single reducer out of many
export function combineModules<
  M extends { [P in keyof M]: StateModule<M[P]["initialState"]> },
  I extends { [Q in keyof M]: M[Q]["initialState"] }
>(modules: M): CombineModulesReturn<I> {
  const keys = Object.keys(modules);

  let actionTypes = {};
  let initialState = {} as unknown as I;
  let reducers = [] as [string, Reducer<M, any>][];

  keys.forEach((key) => {
    const mod = modules[key as unknown as keyof M];

    // 1. Merge all action types
    actionTypes = {
      ...actionTypes,
      ...mod.actionTypes,
    };

    // 2. Merge all initial states namespaced by module key
    initialState = {
      ...initialState,
      [key]: mod.initialState,
    };

    // 3. Merge all reducers into a big array of functions to call in right order
    reducers = [...reducers, [key, mod.reducer as unknown as Reducer<M, any>]];
  });

  const rootReducer: Reducer<I, any> = (state, action) => {
    return reducers.reduce((acc, [key, reducer]) => {
      acc[key as keyof I] = reducer(
        state[key as keyof I] as unknown as M,
        action
      ) as unknown as I[keyof I];
      return acc;
    }, {} as I);
  };

  const combinedModules: CombineModulesReturn<I> = {
    ActionTypes: actionTypes,
    initialState,
    rootReducer,
  };

  return combinedModules;
}
