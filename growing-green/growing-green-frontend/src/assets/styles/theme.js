const baseTheme = {
  fontSizes: ['1em', '1.1em', '1.2em', '1.3em', '2em'],
  colors: {
    blue: '#07c',
    tomato: 'tomato',
    purple: 'purple',
    white: '#fcfcfc',
    darkGreen: '#457f51',
    green: '#9cbd93',
    lightGreen: 'rgba(178, 219, 177, 0.49)',
    black: '#111',
    gray: '#444',
    lightGray: 'rgba(208, 208, 208, 0.3)',
    red: '#b12f35',
    darkRed: '#892429',
    ivory: '#fbfbf9',
    lightBlack: 'rgba(0, 0, 0, 0.35)',
  },
};

const buttons = {
  outline: {
    borderStyle: 'solid',
    borderWidth: '1px',
    width: '140px',
    height: '20px',
    borderRadius: 'none',
  },
  rounded: {
    borderStyle: 'solid',
    borderWidth: '2px',
    width: '200px',
    height: '16px',
    borderRadius: '16px',
  },
};

const buttonSizes = {
  small: {
    width: '110px',
    height: '11px',
    fontSize: baseTheme.fontSizes[0],
    fontWeight: '300',
    lineHeight: '20px',
    padding: '13px 15px',
  },
  medium: {
    width: '140px',
    height: '14px',
    fontSize: baseTheme.fontSizes[1],
    fontWeight: '300',
    lineHeight: '13px',
    padding: '14px 17px',
  },
  large: {
    width: '170px',
    height: '20px',
    fontSize: baseTheme.fontSizes[2],
    fontWeight: '600',
    lineHeight: '20px',
    padding: '15px 15px',
  },
  long: {
    width: '300px',
    height: '15px',
    fontSize: baseTheme.fontSizes[2],
    fontWeight: '600',
    lineHeight: '20px',
    padding: '10px 15px',
  },
  short: {
    width: '180px',
    height: '26px',
    fontSize: baseTheme.fontSizes[2],
    fontWeight: '600',
    lineHeight: '20px',
    padding: '8px 15px',
  },
};

const buttonColors = {
  white: {
    background: baseTheme.colors.white,
    text: baseTheme.colors.black,
    shadow: baseTheme.colors.gray,
    border: baseTheme.colors.black,
  },
  green: {
    background: baseTheme.colors.ivory,
    text: baseTheme.colors.black,
    shadow: baseTheme.colors.green,
    border: baseTheme.colors.black,
  },
  red: {
    background: baseTheme.colors.ivory,
    text: baseTheme.colors.black,
    shadow: baseTheme.colors.red,
    border: baseTheme.colors.black,
  },
  translucentGreen: {
    background: 'rgb(88, 126, 78, 0.5)',
    text: baseTheme.colors.black,
    border: baseTheme.colors.green,
  },
  translucentRed: {
    background: 'rgb(204, 0, 0, 0.3)',
    text: baseTheme.colors.red,
    border: baseTheme.colors.red,
  },
};

module.exports = {
  baseTheme,
  buttonSizes,
  buttonColors,
  buttons,
};
