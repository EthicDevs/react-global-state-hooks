import { useSelect, useStore } from "@ethicdevs/react-global-state-hooks";

import {
  actions,
  selectAuthErrorMessage,
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsAuthInProgress,
} from "../state/auth";

export const Dashboard = () => {
  const { dispatch } = useStore();
  const authErrorMessage = useSelect(selectAuthErrorMessage);
  const currentUser = useSelect(selectCurrentUser);
  const isAuthInProgress = useSelect(selectIsAuthInProgress);
  const isAuthenticated = useSelect(selectIsAuthenticated);

  const onSignIn = () =>
    dispatch(
      actions.signIn({
        username: "john.doe",
        password: "zup3rZeukr3tP4zzWoord3u!!",
      }),
    );

  const onSignOut = () => dispatch(actions.signOut());

  const loadable = (str: string) => (isAuthInProgress ? "Loading..." : str);

  return (
    <main
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      {isAuthenticated === false ? (
        <button disabled={isAuthInProgress} onClick={onSignIn}>
          {loadable("Sign In")}
        </button>
      ) : (
        <button disabled={isAuthInProgress} onClick={onSignOut}>
          {loadable("Sign Out")}
        </button>
      )}
      <div style={{ display: "block", marginTop: 12 }}>
        {authErrorMessage != null ? (
          <span style={{ color: "red", fontWeight: "bold" }}>
            {authErrorMessage}
          </span>
        ) : (
          <h3 style={{ margin: 0 }}>
            {`Hello ${currentUser?.name || "Guest"} !`}
          </h3>
        )}
      </div>
    </main>
  );
};
