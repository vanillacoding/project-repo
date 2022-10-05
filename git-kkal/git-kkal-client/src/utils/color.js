import stc from 'string-to-color';

export const convertColor = (string) => {
  if (typeof string !== 'string') {
    return 0;
  }

  if (!string.length) {
    return 0;
  }

  const color = string[0] !== '#' ? stc(string) : string;

  return parseInt(color.slice(1), 16);
};

export const reverseColor = (colorString) => {
  const colorHexNumber = convertColor(colorString);
  const whiteHexNumber = convertColor('#FFFFFF');

  return `#${(whiteHexNumber - colorHexNumber).toString(16)}`;
};

export const convertHex2String = (colorHexNumber) =>
  `#${colorHexNumber.toString(16).padStart(6, '0')}`;

export const selectFontColor = (string) => {
  const colorHexNumber = convertColor(string);
  const colorString = convertHex2String(colorHexNumber).slice(1);

  const rgb = [
    colorString.slice(0, 2),
    colorString.slice(2, 4),
    colorString.slice(4),
  ];

  const sum = rgb
    .map((color) => color.padStart(2, '0'))
    .reduce((acc, val) => acc + parseInt(val, 16), 0);

  return sum > 350 ? '#000000' : '#FFFFFF';
};

export default {
  convertColor,
  reverseColor,
  convertHex2String,
  selectFontColor,
};
