export function validateInput(rate) {
  return rate.length !== 0;
}
// 코멘트, 스코어, 코멘터, 기타 등등과 일괄 처리로 할지..?
export function validateResultSubmit({ filterScores, totalRate, comment }) {
  let result = true;

  Object.values(filterScores).forEach((score) => {
    if (!validateInput(score)) {
      result = false;
    }
  });

  return validateInput(totalRate) && validateInput(comment) && result;
}
