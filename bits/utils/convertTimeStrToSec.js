import { STRINGS } from '../constants/index';

/**
 * Converst time string to seconds
 * @param {String} timeStr - single string 's', 'm', 'h' represent second minute hour
 * @returns {Number} - Total seconds in number by type of timeString
 */

const convertTimeStrToSec = (timeStr) => {
  const timeStrArr = timeStr.split(' ');
  const time = Number(timeStrArr[0]);
  const measure = timeStrArr[1];

  switch (measure) {
    case STRINGS.SEC:
      return time;

    case STRINGS.MIN:
      return time * 60;

    case STRINGS.HOUR:
      return time * 3600;
  }
};

export default convertTimeStrToSec;
