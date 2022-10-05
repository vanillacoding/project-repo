/**
 * Validate if user's inputted email is validate or not
 * @param {String} email - User inputed email
 * @returns {Boolean} - Boolean if email is validate or not
 */

const validateEmail = (email) => {
  const regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (regExp.test(email) === false) {
    return false;
  }

  return true;
};

export default validateEmail;
