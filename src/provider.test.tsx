import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { GlobalStateProvider } from "./provider";
import { combineModules } from "./helpers";
import { FluxBaseState, FluxStandardAction } from "./types";

describe("GlobalStateProvider", () => {
  test("it should render correctly given empty module", () => {
    // Given
    const { initialState, rootReducer } = combineModules({});
    const TestComponent = () => {
      return (
        <GlobalStateProvider
          initialState={initialState}
          rootReducer={rootReducer}
        >
          <div id="test">test</div>
        </GlobalStateProvider>
      );
    };

    // When
    const { findByText } = render(<TestComponent />);

    // Then
    expect(findByText("test")).toBeDefined();
  });

  test("it should render correctly given one module", () => {
    // Given
    type ModuleOneState = { foo: boolean };

    const { initialState, rootReducer } = combineModules({
      moduleOne: {
        key: "moduleOne",
        initialState: { foo: false } as ModuleOneState,
        actionTypes: { ACTION_ONE: "nsOne/ACTION_ONE" },
        reducer: jest.fn(
          (prevState: ModuleOneState, action: FluxStandardAction) => {
            if (action.type === "ACTION_ONE") {
              return {
                ...prevState,
                foo: true,
              };
            } else {
              return {
                ...prevState,
                foo: false,
              };
            }
          },
        ),
      },
    });

    const TestComponent = () => {
      return (
        <GlobalStateProvider
          initialState={initialState}
          rootReducer={
            rootReducer as unknown as React.Reducer<
              FluxBaseState,
              FluxStandardAction
            >
          }
        >
          <div id="test">test</div>
        </GlobalStateProvider>
      );
    };

    // When
    const { findByText } = render(<TestComponent />);

    // Then
    expect(findByText("test")).toBeDefined();
  });

  test("it should render correctly given many module", () => {
    // Given
    type ModuleOneState = { foo: boolean };
    type ModuleTwoState = { bar: boolean };

    const { initialState, rootReducer } = combineModules({
      moduleOne: {
        key: "moduleOne",
        initialState: { foo: false },
        actionTypes: { ACTION_ONE: "nsOne/ACTION_ONE" },
        reducer: jest.fn(
          (prevState: ModuleOneState, action: FluxStandardAction) => {
            if (action.type === "ACTION_ONE") {
              return {
                ...prevState,
                foo: true,
              };
            } else {
              return prevState;
            }
          },
        ),
      },
      moduleTwo: {
        key: "moduleTwo",
        initialState: { foo: true },
        actionTypes: { ACTION_TWO: "nsOne/ACTION_TWO" },
        reducer: jest.fn(
          (prevState: ModuleTwoState, action: FluxStandardAction) => {
            if (action.type === "ACTION_TWO") {
              return {
                ...prevState,
                bar: false,
              };
            } else {
              return prevState;
            }
          },
        ) as never,
      },
    });

    const TestComponent = () => {
      return (
        <GlobalStateProvider
          initialState={initialState}
          rootReducer={
            rootReducer as unknown as React.Reducer<
              FluxBaseState,
              FluxStandardAction
            >
          }
        >
          <div id="test">test</div>
        </GlobalStateProvider>
      );
    };

    // When
    const { findByText } = render(<TestComponent />);

    // Then
    expect(findByText("test")).toBeDefined();
  });
});
