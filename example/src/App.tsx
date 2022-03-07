import { FC } from "react";
import { GlobalStateProvider } from "@ethicdevs/react-global-state-hooks";

import { Dashboard } from "./components/Dashboard";
import { default as HomeScreen } from "./screens/Home";

import { initialState, rootReducer } from "./state";

const FluxRouter: FC = ({ children }) => {
  return <>{children}</>;
};

const App = () => {
  return (
    <>
      <FluxRouter>
        <Dashboard />
        <HomeScreen />
      </FluxRouter>
    </>
  );
};

const AppWithProviders = () => (
  <>
    <GlobalStateProvider initialState={initialState} rootReducer={rootReducer}>
      <App />
    </GlobalStateProvider>
  </>
);

export default AppWithProviders;
