export class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const errorHandler = (err, res) => {
  console.error(err);
  const { statusCode, message } = err;

  res.status(statusCode || 500).json({
    status: 'Error',
    statusCode,
    message
  });
};
