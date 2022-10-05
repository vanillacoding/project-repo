const httpStatusCodes = require('./httpStatusCodes');
const { ERROR_MESSAGES } = require('../constants');

class BaseError extends Error {
  constructor(statusCode, message) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.message = message || ERROR_MESSAGES.INTERNAL_SERVER;
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, BaseError);
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
    console.log(message);
    super(httpStatusCodes.NOT_FOUND, message || ERROR_MESSAGES.NOT_FOUND);
  }
}

class BadRequestError extends BaseError {
  constructor(message) {
    super(httpStatusCodes.BAD_REQUEST, message || ERROR_MESSAGES.BAD_REQUEST);
  }
}

class InvalidTokenError extends BaseError {
  constructor(message) {
    super(httpStatusCodes.BAD_REQUEST, message || ERROR_MESSAGES.INVALID_TOKEN);
  }
}

class TokenExpiredError extends BaseError {
  constructor(message) {
    super(
      httpStatusCodes.UNAUTHORIZED,
      message || ERROR_MESSAGES.TOKEN_EXPIRED,
    );
  }
}

module.exports = {
  BaseError,
  NotFoundError,
  BadRequestError,
  InvalidTokenError,
  TokenExpiredError,
};
