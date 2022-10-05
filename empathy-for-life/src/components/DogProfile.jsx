import React, { Fragment, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { DEFAULT_ERROR_MESSAGE } from "../constants/constants";
import getDogDescriptions from "../utils/getDogDescriptionLists";
import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";

import styles from "./styles/DogProfile.module.css";
import Container from "./shared/Container";
import PopUpWindow from "./shared/PopUpWindow";
import CloseButton from "./shared/CloseButton";

const DogProfile = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [dogInformation, setDogInformation] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const getDogInformation = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/dog/${id}`,
          {
            credentials: "include",
            signal
          },
        );
        const { message, result } = await response.json();
        if (message === "ok") {
          setDogInformation(result);
        } else {
          setErrorMessage(message);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    };

    getDogInformation();
    return () => controller.abort();
  }, [id]);

  const dogDescriptionLists = getDogDescriptions(dogInformation)
    .map(({ title, description }) => (
      <Fragment key={title}>
        <dt className={styles.descriptionTitle}>{title}</dt>
        <dd className={styles.descriptionContent}>{description}</dd>
      </Fragment>
    ));
  const handleModalClose = () => {
    history.push("/");
  };
  const handleClosePopUp = () => {
    setErrorMessage("");
  };
  const handleImageLoad = ({ target: $img }) => {
    $img.style.visibility = "visible";
  };

  return (
    <Container className={styles.container}>
      <CloseButton
        className={styles.closeButton}
        onClick={handleModalClose}
      />
      {errorMessage
        ? <div className={styles.popUpContainer}>
            <PopUpWindow
              text={errorMessage}
              onClick={handleClosePopUp}
            />
          </div>
        : null
      }
      <div className={styles.informationContainer}>
        <img
          onLoad={handleImageLoad}
          className={styles.profilePhoto}
          src={dogInformation?.photo.url}
          alt="a dog"
        />
        <dl className={styles.descriptionList}>
          {dogDescriptionLists}
        </dl>
      </div>
      <p className={styles.content}>
        {dogInformation?.description}
      </p>
    </Container>

  );
};

export default DogProfile;
