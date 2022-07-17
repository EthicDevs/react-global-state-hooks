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

export function makeFluxRequest<
  P extends Record<string, unknown> = Record<string, unknown>,
>(requestBody: FluxRequestState<P>) {
  return (props?: Partial<P>): FluxRequestState<P> => {
    const requestPayload: FluxRequestState<P> = {
      ...(props || {}),
      ...requestBody,
    };
    return requestPayload as any;
  };
}

export const makeInitialFluxRequest = makeFluxRequest({
  errorMessage: null,
  loading: false,
  requested: false,
});

export const makeLoadingFluxRequest = makeFluxRequest({
  errorMessage: null,
  loading: true,
  requested: true,
});

export const makeSuccessFluxRequest = makeFluxRequest({
  errorMessage: null,
  loading: false,
  requested: true,
});

export const makeFailureFluxRequest = makeFluxRequest({
  errorMessage: "",
  loading: false,
  requested: true,
});
