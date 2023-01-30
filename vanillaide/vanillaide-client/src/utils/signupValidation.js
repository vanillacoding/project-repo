const NAME_REGEX = /^[가-힣a-zA-Z]+$/;
const EMAIL_REGEX =
  /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

function isValidName(name, setErrorMsg) {
  if (!name) {
    setErrorMsg((prev) => ({
      ...prev,
      name: "Enter your name",
    }));

    return false;
  }

  if (NAME_REGEX.test(name) === false) {
    setErrorMsg((prev) => ({
      ...prev,
      name: "Enter English or Korean name",
    }));

    return false;
  }

  return true;
}

function isValidEmail(email, setErrorMsg) {
  if (!email) {
    setErrorMsg((prev) => ({
      ...prev,
      email: "Enter your email",
    }));

    return false;
  }

  if (EMAIL_REGEX.test(email) === false) {
    setErrorMsg((prev) => ({
      ...prev,
      email: "Invalid email form",
    }));

    return false;
  }

  return true;
}

function isValidPassword(password, setErrorMsg) {
  if (!password) {
    setErrorMsg((prev) => ({
      ...prev,
      password: "Enter password",
    }));

    return false;
  }

  if (!PASSWORD_REGEX.test(password)) {
    setErrorMsg((prev) => ({
      ...prev,
      password: "8-20 digits of numbers and alphabets only",
    }));

    return false;
  }

  return true;
}

function isValidPasswordConfirm(passwordConfirm, password, setErrorMsg) {
  if (!passwordConfirm) {
    setErrorMsg((prev) => ({
      ...prev,
      passwordConfirm: "Enter password confirm",
    }));

    return false;
  }

  if (passwordConfirm !== password) {
    setErrorMsg((prev) => ({
      ...prev,
      passwordConfirm: "Enter password confirm same as password",
    }));

    return false;
  }

  return true;
}
export default {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm,
};
