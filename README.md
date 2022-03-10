# `react-global-state-hooks`

[![NPM](https://img.shields.io/npm/v/typescript-library-starter?color=red)](https://www.npmjs.com/package/@ethicdevs/react-global-state-hooks)
[![MIT License](https://img.shields.io/github/license/47ng/typescript-library-starter.svg?color=blue)](https://github.com/ethicdevs/react-global-state-hooks/blob/master/LICENSE)

## Installation

```shell
$ yarn add @ethicdevs/react-global-state-hooks
# or
$ npm i @ethicdevs/react-global-state-hooks
```

## Usage

See this CodeSandBox for a [live editable demo](https://codesandbox.io/s/elegant-hertz-tzxkvp?file=/src/state/index.ts).
Or just run `cd example && yarn && yarn start` if you have cloned the repo already.

---

Add the `GlobalStateProvider` high enough in your tree so that children which needs state are into it.

```jsx
// src/App.tsx
import React from "react";
import { GlobalStateProvider } from "@ethicdevs/react-global-state-hooks";

import { initialState, rootReducer } from "./state";

const App = () => <>{/* Your app */}</>;
const AppWithProviders = () => (
  <GlobalStateProvider initialState={initialState} rootReducer={rootReducer}>
    <App />
  </GlobalStateProvider>
);

export default AppWithProviders;
```

Create a `globalState.ts` file at the root of your `src/` folder, we will use the handy `combineModules` helper to quickly get started:

```ts
// src/state/index.ts
import { combineModules } from "@ethicdevs/react-global-state-hooks";

import { AuthModule } from "./auth";
import { HelloModule } from "./hello";

// Auto export everything needed for the Provider
export const { ActionTypes, rootReducer, initialState } = combineModules({
  auth: AuthModule,
  hello: HelloModule,
});
```

Next we can create our `AuthModule` and `HelloModule` by creating two set of folders with such structure (makes life easier):

For each module, you choose a "modKey", for example here "auth" and "hello" and then use this for folder names, and state keys (see above in combineModules argument 1, keys are modKey's), this allows to "split" the global store into smaller much more manageable objects

- src/
  - components/
  - state/
    - index.ts # where we export our combined modules
    - auth/
      - actionTypes.ts
      - index.ts
      - reducer.ts
      - selectors.ts
    - hello/
      - actionTypes.ts
      - index.ts
      - reducer.ts
      - selectors.ts

The `index.ts` file in each module is where we compose and export the module itself:

```ts
// src/state/auth/index.ts
import { StateModule } from "@ethicdevs/react-global-state-hooks";

import type { AuthState } from "./reducer";

import { ActionTypes, modKey } from "./actionTypes";
import { initialState, reducer } from "./reducer";

// re-exports selectors for easy import in components
export * from "./selectors";

// export module for use in src/state/index.ts
export const AuthModule: StateModule<AuthState> = {
  key: modKey,
  actionTypes: ActionTypes,
  initialState,
  reducer,
};
```

Let's defined some action types we'll implement in our reducer' in a second:

```ts
// src/state/auth/actionType.ts
import { actionType } from "@ethicdevs/react-global-state-hooks";

// Module key.
export const modKey = "auth";

// Types of actions for this module
export const ActionTypes = Object.freeze({
  RESET: actionType("RESET"),
  SIGN_IN_REQUEST: actionType("SIGN_IN_REQUEST", modKey),
  SIGN_IN_SUCCESS: actionType("SIGN_IN_SUCCESS", modKey),
  SIGN_IN_FAILURE: actionType("SIGN_IN_FAILURE", modKey),
  // or shorter:
  ...makeThunkActionType("SIGN_OUT", modKey),
  // SIGN_OUT_REQUEST: auth/SIGN_OUT_REQUEST
  // SIGN_OUT_SUCCESS: auth/SIGN_OUT_SUCCESS
  // SIGN_OUT_FAILURE: auth/SIGN_OUT_FAILURE
});
```

We can now define our reducer, using React built-in useReducer

```ts
// src/state/auth/reducer.ts
import { Reducer } from "react";
import {
  FluxBaseState,
  FluxStandardAction,
} from "@ethicdevs/react-global-state-hooks";

import { ActionType, ActionTypes } from "./actionTypes";

export type User = {
  id: string;
  name: string;
};

export interface AuthState extends FluxBaseState {
  authenticated: boolean;
  errorMessage: null | string;
  loading: boolean;
  user: User | null;
}

// Initial state
export const initialState: AuthState = {
  authenticated: false,
  errorMessage: null,
  loading: false,
  user: null,
};

export const reducer: Reducer<AuthState, FluxStandardAction<ActionType>> = (
  state,
  action,
) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN_REQUEST: {
      return {
        ...state,
        authenticated: false,
        errorMessage: null,
        loading: true,
        user: null,
      };
    }
    case ActionTypes.SIGN_IN_SUCCESS: {
      const { user } = action.payload as { user: User };
      return {
        ...state,
        authenticated: true,
        errorMessage: null,
        loading: false,
        user,
      };
    }
    case ActionTypes.SIGN_IN_FAILURE: {
      const { errorMessage } = action.payload as { errorMessage: string };
      return {
        ...state,
        authenticated: false,
        errorMessage,
        loading: false,
        user: null,
      };
    }
    case ActionTypes.RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
```

And finally some selectors so its easy to retrieve data in the components:

```ts
// src/state/auth/selectors.ts
import { FluxBaseState } from "@ethicdevs/react-global-state-hooks";

import { AuthState } from "./reducer";

type State = {
  [x: string]: FluxBaseState;
  auth: AuthState;
};

export const selectCurrentUser = (state: State) => {
  return state.auth.user;
};

export const selectIsAuthenticated = (state: State) => {
  return state.auth.authenticated;
};

export const selectIsAuthInProgress = (state: State) => {
  return state.auth.loading;
};

export const selectAuthErrorMessage = (state: State) => {
  return state.auth.errorMessage;
};
```

---

See this CodeSandBox for a [live editable demo](https://codesandbox.io/s/elegant-hertz-tzxkvp?file=/src/state/index.ts).

<!-- TODO:

## API docs

### GlobalStateProvider

#### useStore

### FluxStandardAction

#### ActionTypes

#### dispatch

##### action

##### thunk (todo)

### StateModule

#### combineModules

### Selector

#### useSelect

-->

## License

[MIT](https://github.com/ethicdevs/react-global-state-hooks/blob/master/LICENSE)
