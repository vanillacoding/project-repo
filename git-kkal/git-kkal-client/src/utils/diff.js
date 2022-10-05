export function getCodeType(code) {
  if (!code.length) {
    return { sign: '', code: '' };
  }

  const sliced = code.slice(1);

  switch (code[0]) {
    case '+':
      return { sign: '+', code: sliced };
    case '-':
      return { sign: '-', code: sliced };
    default:
      return { sign: '', code };
  }
}

export function getNumberLength(number) {
  if (typeof number !== 'number') {
    return 0;
  }

  if (number < 0) {
    return 0;
  }

  return number.toString().length;
}

export default {
  getCodeType,
  getNumberLength,
};
