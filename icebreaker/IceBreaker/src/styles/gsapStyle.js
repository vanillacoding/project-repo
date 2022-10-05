import theme from './theme';

export const READY = {
  CIRCLE: '.circle',
  BACKGROUND: '.background',
  RED_CIRCLE: {
    duration: 1,
    background: theme.redCircleBg,
  },
  GREEN_CIRCLE: {
    duration: 1,
    background: theme.greenCircleBg,
  },
  YELLOW_CIRCLE: {
    background: theme.yellowCircleBg,
  },
  SCALE_UP_FROM_GREEN: {
    duration: 0.4,
    scale: 1.5,
  },
  TRANSPARENT_FROM_GREEN: {
    duration: 1,
    background: 'transparent',
  },
  SCALE_UP_FROM_YELLOW: {
    duration: 2,
    scale: 20,
    opacity: 0,
  },
};

export const MESSAGE = {
  TEXT: '.text',
  FADE_IN: {
    duration: 5,
    opacity: 1,
  },
  FADE_OUT: {
    duration: 2,
    opacity: 0,
  },
};
