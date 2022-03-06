// lib
import { FluxStandardAction } from "../types";

// A factory function to make an action
export function action<
  R extends Record<string, unknown> = Record<string, unknown>,
  T extends string = string,
  M extends Record<string, unknown> = Record<string, unknown>,
>({
  payload,
  type,
  metas,
}: {
  payload?: R;
  type: string;
  metas?: M;
}): FluxStandardAction<T, R, M> {
  return Object.freeze({
    payload: payload,
    type: type as unknown as T,
    metas: metas,
  });
}
