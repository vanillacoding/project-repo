import { NUMBERS, COLORS } from '../constants/index';

/**
 * Change complete count numbers to color hex code
 * @param {Number} completeCount - Complete counts to colors
 * @returns {String} - Color Hex
 */

const pickColorByCount = (completeCount) => {
  switch (completeCount) {
    case NUMBERS.ZERO:
      return COLORS.FIRST_LEVEL;

    case NUMBERS.ONE:
      return COLORS.SECOND_LEVEL;

    case NUMBERS.TWO:
      return COLORS.THIRD_LEVEL;

    case NUMBERS.THREE:
      return COLORS.FOURTH_LEVEL;
  }
};

export default pickColorByCount;
