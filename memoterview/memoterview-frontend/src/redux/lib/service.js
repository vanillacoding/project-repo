// token logic을 여기로 가져올지, 아니면 별개로 처리할 지에 따라 파일 구분이 필요할 것 같습니다..?
export function setToken(token) {
  localStorage.setItem("authorization", JSON.stringify(token));
}
