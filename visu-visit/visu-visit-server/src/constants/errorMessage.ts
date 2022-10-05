interface IError {
  [key: string]: string;
}

const ERROR: IError = {
  INTERNAL_SERVER: "내부 서버 에러",
  HISTORY_PROCESS: "히스토리 파일을 서버에서 처리하는 중에 에러가 발생했습니다.",
  HISTORY_DELETE: "히스토리 삭제 중 에러가 발생했습니다.",
  INVALID_HISTORY_ID: "유효하지 않은 히스토리 ID 입니다.",
  HISTORY_ID_NOT_EXIST: "해당 ID의 히스토리는 존재하지 않습니다.",
  INVALID_HISTORY_FORMAT: "유효하지 않은 히스토리 형식입니다.",
};

export default ERROR;
