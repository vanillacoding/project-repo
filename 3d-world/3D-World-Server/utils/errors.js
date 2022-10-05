function createRequestError(message = "잘못된 요청입니다.") {
  const error = new Error(message);

  error.status = 400;

  return error;
}

function createAuthenticationError(message = "사용자 인증에 실패했습니다.") {
  const error = new Error(message);

  error.status = 401;

  return error;
}

function createNotFoundError(message = "해당 페이지를 찾을 수 없습니다.") {
  const error = new Error(message);

  error.status = 404;

  return error;
}

exports.createRequestError = createRequestError;
exports.createAuthenticationError = createAuthenticationError;
exports.createNotFoundError = createNotFoundError;
