import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup, render } from "@testing-library/react";

import { GlobalStateProvider } from "./provider";
import { combineModules } from "./helpers";
import { FluxBaseState, FluxStandardAction } from "./types";

describe("GlobalStateProvider", () => {
  afterAll(() => {
    cleanup();
  });

  test("it should render correctly given no modules (empty obj)", () => {
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

  test("it should render and reduce correctly given many modules", async () => {
    // Mock/spy
    const mockReducerModuleOne = jest.fn(
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
    );
    const mockReducerModuleTwo = jest.fn(
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
    );

    // Given
    type ModuleOneState = { foo: boolean };
    type ModuleTwoState = { bar: boolean };

    const { initialState, rootReducer } = combineModules({
      moduleOne: {
        key: "moduleOne",
        initialState: { foo: false },
        actionTypes: { ACTION_ONE: "nsOne/ACTION_ONE" },
        reducer: mockReducerModuleOne,
      },
      moduleTwo: {
        key: "moduleTwo",
        initialState: { bar: true },
        actionTypes: { ACTION_TWO: "nsOne/ACTION_TWO" },
        reducer: mockReducerModuleTwo,
      },
    });

    const TestComponent = () => {
      const [done, setDone] = React.useState(false);
      // An effect that call the root reducer one first time.
      React.useEffect(() => {
        rootReducer(initialState, { type: "@@test/INIT" });
        rootReducer(initialState, { type: "nsOne/ACTION_ONE" });
        rootReducer(initialState, { type: "nsOne/ACTION_TWO" });
        setDone(true);
      }, []); // only on mount

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
          <div id="done">{done === true ? "done:yes" : "done:no"}</div>
        </GlobalStateProvider>
      );
    };

    // When
    const { getByText, findByText } = render(<TestComponent />);

    // Then
    expect(getByText("test")).toBeDefined();
    expect(getByText("done:no")).toBeDefined();

    await findByText("done:yes"); // wait for re-render

    expect(mockReducerModuleOne).toHaveBeenNthCalledWith(
      1,
      { foo: false }, // initialState for this module
      { type: "@@test/INIT" },
    );
    expect(mockReducerModuleOne).toHaveBeenNthCalledWith(
      2,
      { foo: false }, // initialState for this module
      { type: "nsOne/ACTION_ONE" },
    );
    expect(mockReducerModuleOne).toHaveBeenNthCalledWith(
      3,
      { foo: false }, // initialState for this module
      { type: "nsOne/ACTION_TWO" },
    );

    expect(mockReducerModuleTwo).toHaveBeenNthCalledWith(
      1,
      { bar: true }, // initialState for this module
      { type: "@@test/INIT" },
    );
    expect(mockReducerModuleTwo).toHaveBeenNthCalledWith(
      2,
      { bar: true }, // initialState for this module
      { type: "nsOne/ACTION_ONE" },
    );
    expect(mockReducerModuleTwo).toHaveBeenNthCalledWith(
      3,
      { bar: true }, // initialState for this module
      { type: "nsOne/ACTION_TWO" },
    );
  });
});
