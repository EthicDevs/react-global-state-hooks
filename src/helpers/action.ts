// lib
import { FluxStandardAction } from "../types";

// A factory function to make an action
export function action<
  R = Record<string, unknown>,
  T = string,
  M = Record<string, unknown>
>({
  payload,
  type,
  metas,
}: {
  payload?: R;
  type: string;
  metas?: M;
}): FluxStandardAction<R, T, M> {
  return Object.freeze({
    payload: payload,
    type: type as unknown as T,
    metas: metas,
  });
}
