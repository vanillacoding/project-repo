export const validateLength = (min, max, name, value) => {
  if (value.length < min) {
    return `${name}은 최소 ${min}자 이상 입력하세요.`;
  }

  if (value.length > max) {
    return `${name}은 최대 ${max}자까지 입력 가능합니다.`;
  }

  return '';
};

export const validateSpace = (value) => {
  const spaceRegType = /\s/;

  if (value.search(spaceRegType) !== -1) {
    return '공백을 제외하고 입력하세요.';
  }

  return '';
};
