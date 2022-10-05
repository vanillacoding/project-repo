import reducer, { setError, removeError } from "./errorSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    hasError: false,
    statusCode: 200,
    message: "",
  });
});

test("should handle set new error", () => {
  const previousState = {
    hasError: false,
    statusCode: 200,
    message: "",
  };

  const error = {
    statusCode: 404,
    message: "Not Found",
  };

  expect(reducer(previousState, setError(error))).toEqual({
    hasError: true,
    statusCode: 404,
    message: "Not Found",
  });
});

test("should handle set new error when previous error exist", () => {
  const previousState = {
    hasError: true,
    statusCode: 404,
    message: "Not Found",
  };

  const error = {
    statusCode: 500,
    message: "Internal Server Error",
  };

  expect(reducer(previousState, setError(error))).toEqual({
    hasError: true,
    statusCode: 500,
    message: "Internal Server Error",
  });
});

test("should handle remove error", () => {
  const previousState = {
    hasError: true,
    statusCode: 500,
    message: "Internal Server Error",
  };

  expect(reducer(previousState, removeError)).toEqual({
    hasError: false,
    statusCode: 200,
    message: "",
  });
});
