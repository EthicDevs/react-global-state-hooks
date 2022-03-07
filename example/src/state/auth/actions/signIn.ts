import { FluxStandardThunk } from "@ethicdevs/react-global-state-hooks";

import { ActionTypes } from "../actionTypes";

const sleep3s = () =>
  new Promise((ok) => {
    setTimeout(() => {
      ok(true);
    }, 3000);
  });

export const signIn =
  ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): FluxStandardThunk =>
  async (dispatch, action) => {
    try {
      dispatch(
        action({
          type: ActionTypes.SIGN_IN_REQUEST,
          payload: {
            username,
          },
        }),
      );

      await sleep3s();

      if (Math.random() > 0.5) {
        dispatch(
          action({
            type: ActionTypes.SIGN_IN_SUCCESS,
            payload: {
              user: {
                id: "userid",
                name: "John",
              },
            },
          }),
        );
      } else {
        dispatch(
          action({
            type: ActionTypes.SIGN_IN_FAILURE,
            payload: {
              errorMessage:
                "Look like the server was lazy to reply... Please try again now.",
            },
          }),
        );
      }
    } catch (err) {
      dispatch(
        action({
          type: ActionTypes.SIGN_IN_FAILURE,
          payload: {
            errorMessage: (err as Error).message,
          },
        }),
      );
    }
  };
