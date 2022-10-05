class locaChatError extends Error {
  constructor(message, status, displayMessage) {
    super(message);
    this.status = status;
    this.displayMessage = displayMessage;
  }
}

class GeneralError extends locaChatError {
  constructor(message) {
    super(message, 400, '서버에 오류가 있습니다. 잠시 후 다시 시도해주세요.');
  }
}

module.exports = {
  GeneralError
};
