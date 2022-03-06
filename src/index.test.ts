import * as lib from "./index";

describe("action", () => {
  test("it should return a FluxStandardAction", () => {
    // Given
    const expectedAction = {
      metas: undefined,
      payload: {
        some: "test",
        payload: true,
      },
      type: "TEST_ACTION",
    };

    // When
    const action = lib.action({
      type: "TEST_ACTION",
      payload: {
        some: "test",
        payload: true,
      },
    });

    // Then
    expect(action).toStrictEqual(expectedAction);
  });

  test("it should return a FluxStandardAction with metas", () => {
    // Given
    const expectedAction = {
      metas: {
        foo: "bar",
      },
      payload: {
        some: "test",
        payload: true,
      },
      type: "TEST_ACTION",
    };

    // When
    const action = lib.action({
      type: "TEST_ACTION",
      payload: {
        some: "test",
        payload: true,
      },
      metas: {
        foo: "bar",
      },
    });

    // Then
    expect(action).toStrictEqual(expectedAction);
  });
});
