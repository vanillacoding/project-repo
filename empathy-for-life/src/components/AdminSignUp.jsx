import React, { useState, useEffect, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import validator from "validator";

import { IMAGE_URLS } from "../constants/constants";

import {
  actionCreators,
  selectors,
  ReducerContext,
} from "../features/rootSlice";

import styles from "./styles/AdminSignUp.module.css";
import Home from "./shared/Home.jsx";
import Input from "./shared/Input.jsx";
import InputButton from "./shared/InputButton.jsx";
import PopUpWindow from "./shared/PopUpWindow";
import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";

const AdminSignUp = () => {
  const [signUpForm, setSignUpForm] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { state, dispatch } = useContext(ReducerContext);
  const isAdministrator = selectors.getIsAdministrator(state);
  const history = useHistory();

  useEffect(() => {
    if (!signUpForm) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const signUpAdmin = async () => {
      try {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const body = JSON.stringify({
          id: signUpForm.id,
          password: signUpForm.password,
          userName: signUpForm.userName,
          email: signUpForm.email,
        });
        const response = await fetch(
          `${serverUrl}/admin/sign-up`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body,
            signal,
          },
        );

        const { message, result } = await response.json();

        if (message === "ok") {
          const userSession = {
            id: result._id,
            name: result.user_name,
            isAdministrator: result.is_administrator,
            character: result.character,
            accessTime: result.access_time,
          };

          dispatch(
            actionCreators.userAdded(userSession),
          );
          return history.replace("/");
        }

        setSignUpForm(null);

        if (message === "existed id") {
          setErrorMessage("이미 존재하는 아이디입니다.");
        } else if (message === "invalid request") {
          setErrorMessage("잘못된 입력값입니다. 다시 입력해주세요.")
        } else {
          setErrorMessage(message);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setSignUpForm(null);
        setErrorMessage("잠시 후 다시 시도해 주세요");
      }
    };

    signUpAdmin();

    return () => controller.abort();
  }, [signUpForm, dispatch, history]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target.form);
    const signUpForm = {
      id: formData.get("ID").toLowerCase(),
      password: formData.get("Password"),
      confirmPassword: formData.get("Confirm Password"),
      userName: formData.get("User name"),
      email: formData.get("Email"),
    };
    let message = "";

    if (!validator.isAlphanumeric(signUpForm.id)) {
      message += "ID는 대소문자 알파벳과 숫자 조합만 가능합니다.\n";
    }

    if (validator.isEmpty(signUpForm.password)) {
      message += "Password를 입력해주세요.\n"
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      message += "Password와 Confirm password가 일치하지 않습니다.\n";
    }

    if (validator.isEmpty(signUpForm.userName)) {
      message += "User name을 입력해주세요.\n";
    }

    if (!validator.isEmail(signUpForm.email)) {
      message += "유효한 Email을 입력해주세요.\n";
    }

    if (message) {
      setErrorMessage(message);
    } else {
      setSignUpForm(signUpForm);
    }
  };
  const handleClosePopUp = () => {
    setErrorMessage("");
  };

  if (isAdministrator) {
    return <Redirect to="/" />;
  }

  const inputs = [
    "ID",
    "Password",
    "Confirm Password",
    "User name",
    "Email"
  ].map((title, index) => {
    const inputType = title.includes("Password")
      ? "password"
      : "text";

    return (
      <Input
        key={index}
        type={inputType}
        title={title}
        inputAttr={{
          style: { marginTop: "1vh" },
          type: inputType,
          name: title,
          required: true,
        }}
      />
    );
  });

  return (
    <Home imageSrc={IMAGE_URLS.DOGS_HANGING_BACK}>
      {errorMessage
        ? <PopUpWindow text={errorMessage} onClick={handleClosePopUp}/>
        : null
      }
      <form className={styles.form}>
        {inputs}
        <div className={styles.buttonsContainer}>
          <InputButton text={"sign up"} onClick={handleSubmit} disabled={!!signUpForm}/>
        </div>
      </form>
    </Home>
  );
};

export default AdminSignUp;
