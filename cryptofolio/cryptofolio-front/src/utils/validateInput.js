/**
 *
 * @param {object} signupData Option for audioContext
 * @returns Created audioContext
 */
const validateInput = (signupData) => {
  const { email, password, passwordConfirm } = signupData;
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!EMAIL_REGEX.test(email)) {
    return "잘못된 이메일 형식입니다.";
  }

  if (password.length < 8) {
    return "비밀번호는 8자리 이상이어야 합니다.";
  }

  if (passwordConfirm && password !== passwordConfirm) {
    return "비밀번호가 일치하지 않습니다.";
  }
};

export default validateInput;
