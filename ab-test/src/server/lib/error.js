class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Oops! We couldn\'t process your request. Could you please try again?';
    this.status = 404;
  }
}

class WrongEntityError extends Error {
  constructor() {
    super();
    this.message = 'Something wrong. Could you check your request again?';
    this.status = 422;
  }
}

class GeneralServiceError extends Error {
  constructor() {
    super();
    this.message = 'Sorry, there was an internal error. Could you please try it again?';
    this.status = 500;
  }
}

class NotAuthenticatedError extends Error {
  constructor() {
    super();
    this.message = 'Oops! Coult you please sign in first?';
    this.state = 401;
  }
}

module.exports = {
  NotFoundError,
  WrongEntityError,
  GeneralServiceError,
  NotAuthenticatedError,
};
