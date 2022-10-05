const KOR = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
const ENG = /[a-zA-Z]/;
const NUM = /[0-9]/;
const SPC = /[~!@#$%^&*()_+|<>?:{}]/;

export const inspectKorean = (str) => {
  return KOR.test(str) && !ENG.test(str) && !NUM.test(str) && !SPC.test(str);
};
