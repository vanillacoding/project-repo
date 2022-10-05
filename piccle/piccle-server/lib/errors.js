class NotFoundError extends Error {
  constructor(name, message) {
    super();
    this.status = 400;
    this.name = name;
    this.message = message;
  }
}

class ForbiddenError extends Error {
  constructor(name, message) {
    super();
    this.status = 403;
    this.name = name;
    this.message = message;
  }
}

module.exports = {
  NotFoundError,
  ForbiddenError
};
