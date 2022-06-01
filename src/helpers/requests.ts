// lib
import { FluxRequestsState, FluxRequestState } from "../types";

// A factory function for initial requests state
export function makeInitialFluxRequests<
  K extends readonly string[] = readonly string[],
  P extends Record<string, unknown> = Record<string, unknown>,
>(reqNames: K, initialProps?: P): FluxRequestsState<K> {
  return reqNames.reduce((acc, next) => {
    acc = {
      ...acc,
      [next]: {
        ...(initialProps || {}),
        errorMessage: null,
        loading: false,
        requested: false,
      } as FluxRequestState<P>,
    } as FluxRequestsState<K, P>;
    return acc;
  }, {} as FluxRequestsState<K, P>);
}
