const ERROR_MESSAGES = {
  GET_CHROME_STORAGE: "스토리지에서 데이터를 불러오는데 실패했습니다.",
  SET_CHROME_STORAGE: "스토리지에 데이터를 저장하는데 실패했습니다.",
  GET_PROFILE_USER_INFO: "유저 프로필에서 이메일을 가져오는데 실패했습니다.",
  LAUNCH_WEB_AUTH_FLOW: "OAuth 인증 과정이 실패했습니다.",
  GET_TOKENS:
    "OAuth2 인증 과정에서 오류가 발생했습니다. \n manifest.json 파일에 유효한 client_id를 입력했는지 확인해주세요.",
};

export default ERROR_MESSAGES;
