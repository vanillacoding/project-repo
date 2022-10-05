const DUPLICATE_REQUEST = "연속적인 로그인이 식별되었습니다.";
const POPUP_BLOCKED = "팝업이 차단되어있습니다.";
const POPUP_CLOSED = "로그인 진행중 팝업이 종료되었습니다.";
const UNEXPECTED_ERROR = "예상치 못한 오류가 발생하였습니다.";
const EXPIRED_TOKEN = "토큰이 만료되었습니다.";
const FAILURE_LOGIN = "로그인에 실패했습니다.";
const FAILURE_LOGOUT = "로그아웃을 실패하였습니다.";
const FAILED_FULFILLMENT = "알 수 없는 이유로 요청하신 작업을 수행할 수 없습니다.";
const INCLUDING_SPECIAL_CHARACTER = "특수문자를 포함할 수 없습니다.";
const INCLUDING_SPACE = "공백을 포함할 수 없습니다.";
const DEMAND_INPUT = "하나 이상의 값을 입력해 주세요.";
const INSUFFICIENT_NICKNAME_LENGTH = "두 글자 이상 입력해 주세요.";
const EXCESSIVE_NICKNAME_LENGTH = "최대 10자리까지 입력 가능합니다.";
const EXCESSIVE_HASHTAG_NUMBER = "해시태그 개수는 5개를 초과할 수 없습니다.";
const EXCESSIVE_HASHTAG_LENGTH = "각 해시태그는 최대 15자리까지 입력 가능합니다.";
const UNSUITABLE_CASE = "모든 해시태그는 PascalCase로 입력되어야 합니다.";
const EXCESSIVE_IMAGE_SIZE = "첨부파일 사이즈는 1MB 이내로 등록 가능합니다.";
const FAILED_UPLOAD_IMAGE = "이미지를 업로드하실 수 없습니다.";
const USER_INFORMATION_UPDATED = "정보가 수정되었습니다.";
const INSUFFICIENT_COMMENT_LENGTH = "한 글자 이상 작성해주세요.";
const CREATE_COMMENT_SUCCEEDED = "댓글이 작성되었습니다.";
const DELETE_COMMENT_SUCCEEDED = "댓글이 삭제되었습니다.";
const UPDATE_COMMENT_SUCCEEDED = "댓글이 수정되었습니다.";
const COMMENT_FORBIDDEN = "다시 로그인해주십시오.";
const UNKNOWN_FOLLOWING_STATUS = "현재 팔로우 상태가 확인되지 않았습니다.";
const UNKNOWN_LIKE_STATUS = "현재 좋아요 상태가 확인되지 않았습니다.";
const NOT_FOUND_USER = "존재하지 않는 사용자입니다.";
const NOT_FOUND_SNIPPET = "존재하지 않는 게시물입니다.";
const FORBIDDEN_FOLLOWING = "다른 사용자만 팔로우할 수 있습니다.";
const COMMENT_INPUT_BLOCKED = "로그인 후 댓글을 작성할 수 있습니다.";
const FOLLOWING_NOBODY = "구독 중인 사람이 없습니다.";
const FAILED_UPDATE_COMMENT = "존재하지 않는 게시물이거나 재로그인이 필요합니다.";
const OK = "ok";

export {
  DUPLICATE_REQUEST,
  POPUP_BLOCKED,
  POPUP_CLOSED,
  UNEXPECTED_ERROR,
  EXPIRED_TOKEN,
  FAILURE_LOGIN,
  FAILURE_LOGOUT,
  FAILED_FULFILLMENT,
  INCLUDING_SPECIAL_CHARACTER,
  INCLUDING_SPACE,
  DEMAND_INPUT,
  INSUFFICIENT_NICKNAME_LENGTH,
  EXCESSIVE_NICKNAME_LENGTH,
  EXCESSIVE_HASHTAG_NUMBER,
  EXCESSIVE_HASHTAG_LENGTH,
  UNSUITABLE_CASE,
  EXCESSIVE_IMAGE_SIZE,
  FAILED_UPLOAD_IMAGE,
  USER_INFORMATION_UPDATED,
  INSUFFICIENT_COMMENT_LENGTH,
  CREATE_COMMENT_SUCCEEDED,
  DELETE_COMMENT_SUCCEEDED,
  UPDATE_COMMENT_SUCCEEDED,
  COMMENT_FORBIDDEN,
  UNKNOWN_FOLLOWING_STATUS,
  UNKNOWN_LIKE_STATUS,
  NOT_FOUND_USER,
  NOT_FOUND_SNIPPET,
  FORBIDDEN_FOLLOWING,
  COMMENT_INPUT_BLOCKED,
  FOLLOWING_NOBODY,
  FAILED_UPDATE_COMMENT,
  OK,
};
