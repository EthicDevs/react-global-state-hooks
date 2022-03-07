import { FluxStandardThunk } from "@ethicdevs/react-global-state-hooks";

import { ActionTypes } from "../actionTypes";

const sleep1s = () =>
  new Promise((ok) => {
    setTimeout(() => {
      ok(true);
    }, 1300);
  });

export const signOut = (): FluxStandardThunk => async (dispatch, action) => {
  try {
    dispatch(
      action({
        type: ActionTypes.SIGN_OUT_REQUEST,
      }),
    );

    await sleep1s();

    if (Math.random() > 0.1) {
      dispatch(
        action({
          type: ActionTypes.SIGN_OUT_SUCCESS,
        }),
      );
    } else {
      dispatch(
        action({
          type: ActionTypes.SIGN_OUT_FAILURE,
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
        type: ActionTypes.SIGN_OUT_FAILURE,
        payload: {
          errorMessage: (err as Error).message,
        },
      }),
    );
  }
};
