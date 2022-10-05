const logWarnOrErrInDevelopment = (err, type = "err") => {
  if (process.env.NODE_ENV === "development") {
    if (type === "warn") {
      console.warn(err);
    }

    if (type === "err") {
      console.error(err);
    }
  }
};

export default logWarnOrErrInDevelopment;
