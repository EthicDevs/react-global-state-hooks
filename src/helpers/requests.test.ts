import * as lib from "./requests";

describe("makeInitialFluxRequests", () => {
  test("it should return an object of requests at their initial state", () => {
    // Given
    const requests = ["test-req-1", "test-req-2", "test-req-3"] as const;
    const expectedInitialRequests = {
      "test-req-1": { errorMessage: null, loading: false, requested: false },
      "test-req-2": { errorMessage: null, loading: false, requested: false },
      "test-req-3": { errorMessage: null, loading: false, requested: false },
    };

    // When
    const initialRequests = lib.makeInitialFluxRequests(requests);

    // Then
    expect(initialRequests).toStrictEqual(expectedInitialRequests);
  });

  test("it should return an object of requests at their initial state + custom payload", () => {
    // Given
    const requests = ["test-req-1", "test-req-2", "test-req-3"] as const;
    const expectedInitialRequests = {
      "test-req-1": {
        errorMessage: null,
        loading: false,
        requested: false,
        foo: "bar",
        baz: { quxx: true },
      },
      "test-req-2": {
        errorMessage: null,
        loading: false,
        requested: false,
        foo: "bar",
        baz: { quxx: true },
      },
      "test-req-3": {
        errorMessage: null,
        loading: false,
        requested: false,
        foo: "bar",
        baz: { quxx: true },
      },
    };

    // When
    const initialRequests = lib.makeInitialFluxRequests(requests, {
      foo: "bar",
      baz: { quxx: true },
    });

    // Then
    expect(initialRequests).toStrictEqual(expectedInitialRequests);
  });
});
