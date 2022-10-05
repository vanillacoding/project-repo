import { STRINGS, MESSAGE } from '../constants/index';

/**
 * Generate modal message by user's lack input status
 * @param {String} messageType - modal message type
 * @returns {String} - modal message
 */

const pickModalMessage = (messageType) => {
  switch (messageType) {
    case STRINGS.NONE:
      return MESSAGE.REGISTER_ALL_INFOS;

    case STRINGS.INVALID_EMAIL:
      return MESSAGE.INVALID_EMAIL_FORM;

    case STRINGS.PASSWORD_MISMATCH:
      return MESSAGE.PASSWORD_MISMATCH_KR;
  }
};

export default pickModalMessage;
