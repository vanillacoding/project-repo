class RequestError extends Error {
  constructor() {
    super();
    this.message = '잘못된 요청입니다.';
    this.status = 400;
  }
}

class LoginError extends Error {
  constructor() {
    super();
    this.message = '로그인에 실패했습니다. 다시 시도해 주세요.';
    this.status = 401;
  }
}

class AuthenticationError extends Error {
  constructor() {
    super();
    this.message = '사용자 인증에 실패했습니다.';
    this.status = 401;
  }
}

class NotFoundError extends Error {
  constructor() {
    super();
    this.message = '해당 페이지를 찾을 수 없습니다.';
    this.status = 404;
  }
}

module.exports = {
  LoginError,
  AuthenticationError,
  NotFoundError,
  RequestError
};
