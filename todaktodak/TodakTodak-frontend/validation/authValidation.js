export const validateSignupInfo = (signupInfo) => {
  const {
    email,
    password,
    nickname
  } = signupInfo;

  if (!email || !password || !nickname) {
    return "누락된 정보가 있습니다.";
  }

  if (!validateEmail(email)) {
    return "이메일 양식이 틀렸습니다";
  }

  if (password.length < 8) {
    return "비밀번호는 8자리 이상 입력해주세요";
  }
};

const validateEmail = (email) => {
  return email.match(/\w+@\w+.\w+/g);
};
