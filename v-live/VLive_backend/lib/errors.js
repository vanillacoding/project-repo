const { ERR_MSG } = require('../constants/errors/errorMessage');

class VliveError extends Error {
  constructor() {
    super();
    console.log(this.message);

    this.name = 'ServerError';
    this.result = 'error';
    this.message = ERR_MSG.SERVER_ERR;
    this.status = 500;
  }
}

class NotFoundError extends VliveError {
  constructor() {
    super();
    this.name = 'NotFoundError';
    this.message = ERR_MSG.NOT_FOUND;
    this.status = 404;
  }
}

class InvalidDataError extends VliveError {
  constructor() {
    super();
    this.name = 'InvalidDataError';
    this.message = ERR_MSG.INVALID_DATA;
    this.status = 400;
  }
}

class ExistingDataError extends VliveError {
  constructor() {
    super();
    this.name = 'ExistingDataError';
    this.message = ERR_MSG.ALREADY_EXIST;
    this.status = 400;
  }
}

class ExistingBlankError extends VliveError {
  constructor() {
    super();
    this.name = 'ExistingBlankError';
    this.message = ERR_MSG.FILL_BLANK;
    this.status = 400;
  }
}

class BadRequestError extends VliveError {
  constructor() {
    super();
    this.name = 'BadRequestError';
    this.message = ERR_MSG.BAD_REQUEST;
    this.status = 400;
  }
}

class JsonWebTokenError extends VliveError {
  constructor() {
    super();
    this.name = 'JsonWebTokenError';
    this.message = ERR_MSG.INVALID_TOKEN;
    this.status = 401;
  }
}

class TokenExpiredError extends VliveError {
  constructor() {
    super();
    this.name = 'TokenExpiredError';
    this.message = ERR_MSG.TOKEN_EXPIRED;
    this.status = 401;
  }
}

module.exports = {
  VliveError,
  NotFoundError,
  InvalidDataError,
  ExistingDataError,
  BadRequestError,
  ExistingBlankError,
  JsonWebTokenError,
  TokenExpiredError,
};
