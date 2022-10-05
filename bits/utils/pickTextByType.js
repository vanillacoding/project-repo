import { STRINGS } from '../constants/index';

/**
 * habitType to KR text
 * @param {String} habitType - HabitType in EN
 * @returns {String} - HabitType in KR text
 */

const pickTextByType = (habitType) => {
  switch (habitType) {
    case STRINGS.CODE:
      return STRINGS.CODE_KR;

    case STRINGS.READ:
        return STRINGS.READ_KR;

    case STRINGS.SWIM:
      return STRINGS.SWIM_KR;

    case STRINGS.MEDITATE:
      return STRINGS.MEDITATE_KR;

    case STRINGS.RUN:
      return STRINGS.RUN_KR;

    case STRINGS.BICYCLE:
      return STRINGS.BICYCLE_KR;

    case STRINGS.YOGA:
      return STRINGS.YOGA_KR;
  }
};

export default pickTextByType;
