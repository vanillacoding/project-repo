interface ICustomError {
  result: "error";
  error: {
    code: number;
    message: string;
  };
}

const createError = (code: number, message: string): ICustomError => ({
  result: "error",
  error: { code, message },
});

export default createError;
