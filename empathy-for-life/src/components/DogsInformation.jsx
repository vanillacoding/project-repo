import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import throttle from "lodash.throttle";

import { ReducerContext, selectors } from "../features/rootSlice";
import { DEFAULT_ERROR_MESSAGE } from "../constants/constants";
import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";


import styles from "./styles/DogsInformation.module.css";
import Container from "./shared/Container";
import ModalHeader from "./shared/ModalHeader";
import InputButton from "./shared/InputButton";
import Input from "./shared/Input";
import DogInformationCard from "./shared/DogInformationCard";
import CloseButton from "./shared/CloseButton";
import PopUpWindow from "./shared/PopUpWindow";
import Loading from "./shared/Loading";

const DogsInformation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSeartch] = useState("");
  const [
    dogInformations,
    setDogInformations,
  ] = useState({ dogDatum: [], next: null });
  const { state } = useContext(ReducerContext);
  const isAdministrator = selectors.getIsAdministrator(state);
  const history = useHistory();
  const { modal } = history.location.state;

  useEffect(() => {
    let controller;
    const timeId = setTimeout(async () => {
      controller = new AbortController();
      const { signal } = controller;

      try {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(
          `${serverUrl}/dog?search=${search}`,
          {
            credentials: "include",
            signal,
          },
        );
        const {
          message,
          result: { dogs, next }
        } = await response.json();

        if (message === "ok") {
          const filteredDogs = dogs.map(({ _id, name, breed, gender, age, character }) => ({
            id: _id,
            name,
            breed,
            gender,
            age,
            character,
          }));
          setDogInformations({ dogDatum: filteredDogs, next });
        } else {
          setErrorMessage(message);
        }
      } catch (error) {
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      } finally {
        setIsLoading(false);
      }
    }, 300);
    return () => {
      clearTimeout(timeId);
      controller?.abort();
    }
  }, [search]);

  useEffect(() => {
    if (!shouldFetch || !dogInformations.next) {
      return;
    }

    setShouldFetch(false);
    const controller = new AbortController();
    const { signal } = controller;

    const fetchNextDogInformations = async () => {
      try {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(
          `${serverUrl}/dog?search=${search}&next=${dogInformations.next}`,
          {
            credentials: "include",
            signal,
          },
        );

        const { message, result: { dogs, next } } = await response.json();

        if (message === "ok") {
          const filteredDogs = dogs.map(({ _id, name, breed, gender, age, character }) => ({
            id: _id,
            name,
            breed,
            gender,
            age,
            character,
          }));

          setDogInformations({
            dogDatum: dogInformations.dogDatum.concat(filteredDogs),
            next,
          });
        } else {
          setErrorMessage(message);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    };

    fetchNextDogInformations();
  }, [shouldFetch, search, dogInformations]);

  const handleModalClose = () => {
    history.push("/");
  };
  const handleSearchInput = (event) => {
    setSeartch(event.target.value);
  };
  const handleClosePopUp = () => {
    setErrorMessage("");
  };
  const handleNextDogInfoFetch = throttle((event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const scrollBottomPostion = scrollTop + clientHeight;
    const isNearBottom = scrollHeight <= scrollBottomPostion + 1;

    if (isNearBottom) {
     setShouldFetch(true);
    }
  }, 500);

  const dogInformationList = dogInformations.dogDatum.map((dogInfo) => (
    <DogInformationCard key={dogInfo.id} isAdmin={isAdministrator} {...dogInfo} />
  ));

  if (!dogInformationList.length) {
    dogInformationList.push(
      <p key="notice" className={styles.notice}>등록된 개가 없습니다 😥</p>,
    )
  }

  return (
    <Container className={styles.container}>
      {errorMessage
        ? <PopUpWindow
            className={styles.popUp}
            text={errorMessage}
            onClick={handleClosePopUp}
          />
        : null
      }
      <ModalHeader
        className={styles.modalHeader}
        text={"강아지들"}
      >
        <CloseButton
          className={styles.closeButton}
          onClick={handleModalClose}
        />
        <div className={styles.inputsContainer}>
          { isAdministrator
            ? <Link
                className={styles.anchor}
                to={{
                  pathname: "/dogs/new",
                  state: { modal },
                }}
              >
                <InputButton
                  className={styles.addButton}
                  type="button"
                  text={"추가"}
                />
              </Link>
            : null
          }
          <Input
            inputClassName={styles.search}
            inputAttr={{
              value: search,
              placeholder: "검색",
              onInput: handleSearchInput,
            }}
          />
        </div>
      </ModalHeader>
      <div
        className={styles.cardContainer}
        onScroll={handleNextDogInfoFetch}
      >
        {isLoading
          ? <Loading className={styles.loading} />
          : dogInformationList
        }
      </div>
    </Container>
  );
};

export default DogsInformation;
