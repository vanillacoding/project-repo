import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import detectMobileIs from "../utils/detectMobileIs"
import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";
import {
  DEFAULT_ERROR_MESSAGE,
  IMAGE_URLS,
 } from "../constants/constants";

import {
  actionCreators,
  ReducerContext,
} from "../features/rootSlice";

import PopUpWindow from "./shared/PopUpWindow";
import { signInWithGoogle } from "../auth/firebase";
import getAuthHeaderByToken from "../utils/getAuthHeaderByToken"
import styles from "./styles/UserSignIn.module.css";
import Home from "./shared/Home.jsx";


const UserSignIn = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { dispatch } = useContext(ReducerContext);
  const history = useHistory();
  const isMobile = detectMobileIs();

  useEffect(() => {
    if (!isSigningIn) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const signInUser = async () => {
      try {
        const idToken = await signInWithGoogle();
        const authHeader = getAuthHeaderByToken(idToken);
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(
          `${serverUrl}/user/sign-in`,
          {
            method: "POST",
            headers: authHeader,
            credentials: "include",
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
            accessTime:result.access_time,
          };

          dispatch(actionCreators.userAdded(userSession));

          return history.replace("/");
        }

        setIsSigningIn(false);
        setErrorMessage(message);
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setIsSigningIn(false);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    };

    signInUser();

    return () => controller.abort();
  }, [isSigningIn, dispatch, history]);

  const handleSignIn = () => {
    setIsSigningIn(true);
  };
  const handleClosePopUp = () => {
    setErrorMessage("");
  };

  return (
    <Home imageSrc={IMAGE_URLS.DOGS_HANGING_FRONT}>
      {errorMessage
        ? (
            <PopUpWindow
              text={`로그인 실패.\n잠시 후 다시 시도해 주세요.`}
              onClick={handleClosePopUp}
            />
          )
        : null
      }
      {isMobile
        ? <span className={styles.mobileNotice}>"현재 모바일 환경은 지원하질 않습니다.😥"</span>
        : <button className={styles.signInButton} onClick={handleSignIn}>
            <img
              className={styles.googleIcon}
              src={IMAGE_URLS.GOOGLE_ICON}
              alt="Google Logo"
            />
            <span className={styles.signText}>Sign In with Google</span>
          </button>
      }
    </Home>
  );
};

export default UserSignIn;
