import React, { useEffect, useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import { ReducerContext, actionCreators } from "../features/rootSlice";
import { DEFAULT_ERROR_MESSAGE } from "../constants/constants";

import styles from "./styles/Menu.module.css";
import Container from "./shared/Container";
import ModalHeader from "./shared/ModalHeader";
import HeaderBoard from "./shared/HeaderBoard";
import PopUpWindow from "./shared/PopUpWindow";
import CloseButton from "./shared/CloseButton";
import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";

const Menu = () => {
  const { dispatch } = useContext(ReducerContext);
  const [shouldLogOut, setShouldLogOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!shouldLogOut) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const signOutUser = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/user/sign-out`,
          {
            credentials: "include",
            signal,
          },
        );

        const { message } = await response.json();

        if (message === "ok") {
          dispatch(actionCreators.userDeleted());
          history.push("/");
        } else {
          setErrorMessage(message);
          setShouldLogOut(false);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    };

    signOutUser();

    return () => controller.abort();
  }, [shouldLogOut, dispatch, history]);

  const handleLogOut = () => {
    if (shouldLogOut) {
      return;
    }

    setShouldLogOut(true);
  };
  const handlePopUpClose = () => {
    setErrorMessage("");
  };
  const handleModalClose = () => {
    history.push("/");
  };

  return (
    <Container className={styles.Container}>
      <CloseButton className={styles.closeButton} onClick={handleModalClose} />
      {errorMessage
        ? <PopUpWindow className={styles.popUp} text={errorMessage} onClick={handlePopUpClose}/>
        : null
      }
      <ModalHeader text="메뉴" />
      <HeaderBoard
        boardClassName={styles.board}
        barClassName={styles.bar}
        onClick={handleLogOut}
      >
        로그아웃
      </HeaderBoard>
    </Container>
  );
};

export default Menu;
