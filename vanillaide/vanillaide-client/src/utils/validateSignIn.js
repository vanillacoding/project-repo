import {
  VALIDATION_EMAIL_EMPTY,
  VALIDATION_EMAIL_WRONG,
  VALIDATION_PASSWORD_EMPTY,
} from "../constants/error";

function email(inputValue, setErrorFunc) {
  if (!inputValue) {
    setErrorFunc((state) => {
      return { ...state, email: VALIDATION_EMAIL_EMPTY };
    });

    return false;
  } else if (
    !/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
      inputValue,
    )
  ) {
    setErrorFunc((state) => {
      return { ...state, email: VALIDATION_EMAIL_WRONG };
    });

    return false;
  } else {
    setErrorFunc((state) => {
      return { ...state, email: "" };
    });

    return true;
  }
}

function password(inputValue, setErrorFunc) {
  if (!inputValue) {
    setErrorFunc((state) => {
      return { ...state, password: VALIDATION_PASSWORD_EMPTY };
    });

    return false;
  } else {
    setErrorFunc((state) => {
      return { ...state, password: "" };
    });

    return true;
  }
}

export default { email, password };
