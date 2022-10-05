const { ERROR } = require("../constants");

function validateCreatePin({
  tags,
  text,
  creator,
  coords,
  buffer,
  originalname,
}) {
  const checkEng = /[a-zA-Z]/;

  if (!tags || !text || !creator || !coords || !buffer || !originalname) {
    return { isValid: false, message: ERROR.invalidPinData };
  }

  if (tags.length > 3) {
    return { isValid: false, message: ERROR.invalidtags };
  }

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];

    if (checkEng.test(tag)) {
      return { isValid: false, message: ERROR.invalidtags };
    }

    if (tag.length > 5) {
      return { isValid: false, message: ERROR.invalidtags };
    }
  }

  if (text.length < 10) {
    return { isValid: false, message: ERROR.invalidTxt };
  }

  if (!buffer || !originalname) {
    return { isValid: false, message: ERROR.invalidImage };
  }

  return { isValid: true };
}

module.exports = validateCreatePin;
