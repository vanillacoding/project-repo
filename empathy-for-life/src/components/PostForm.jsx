import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  LIMIT_FILE_SIZE,
  DEFAULT_ERROR_MESSAGE,
} from "../constants/constants";
import {
  ReducerContext,
  selectors,
} from "../features/rootSlice";
import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";

import styles from "./styles/PostForm.module.css";
import Container from "./shared/Container";
import CloseButton from "./shared/CloseButton";
import ModalHeader from "./shared/ModalHeader";
import InputButton from "./shared/InputButton";
import PopUpWindow from "./shared/PopUpWindow";
import Input from "./shared/Input";

const PostForm = () => {
  const [optionDatum, setOptionDatum] = useState([
    { value: "all", content: "전체" },
  ]);
  const [dogIds, setDogIds] = useState(["all"]);
  const [photo, setPhoto] = useState(null);
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const { state } = useContext(ReducerContext);
  const { id } = useParams();
  const history = useHistory();
  const { modal } = history.location.state;
  const userId = selectors.getUserId(state);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const getDogNames = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/dog/names`,
          { signal, credentials: "include" },
        );
        const { message, result } = await response.json();

        if (message === "ok") {
          const processedDogDatum = result.map((dogData) => (
            { value: dogData._id, content: dogData.name }
          ));
          setOptionDatum((datum) => datum.concat(processedDogDatum));
        } else {
          setErrorMessage(message);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    };

    getDogNames();
  }, []);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const body = JSON.stringify({
      writer: userId,
      dogIds,
      content,
      photo,
    });
    const fetchOptions = {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body,
      signal,
    };

    const addNewPost = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/posts/new`,
          { ...fetchOptions, method: "POST" },
        );

        const { message } = await response.json();

        if (message === "ok") {
          return history.push("/posts", { modal });
        }

        setErrorMessage(message);
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      } finally {
        setShouldFetch(false);
      }
    };
    const editPost = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/posts/${id}`,
          { ...fetchOptions, method: "PUT" },
        );

        const { message } = await response.json();

        if (message === "ok") {
          history.push("/posts", { modal });
        } else {
          setErrorMessage(message);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      } finally {
        setShouldFetch(false);
      }

    };

    if (id) {
      editPost();
    } else {
      addNewPost();
    }

    return () => controller.abort();
  }, [id, shouldFetch, content, dogIds, history, modal, photo, userId]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const getPost = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/posts/${id}`,
          {
            credentials: "include",
            signal,
          },
        );

        const { message, result } = await response.json();
        const { dogs, content, photo: { url } } = result || {};

        if (message === "ok") {
          setDogIds(dogs);
          setPhoto(url);
          setContent(content);
        } else {
          setErrorMessage(message);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    };

    getPost();

    return () => controller.abort();
  }, [id]);

  const handleModalClose = () => {
    history.push("/");
  };
  const handlePostCancel = () => {
    history.goBack();
  };
  const handleDogNameSelect = (event) => {
    const values = Array.from(
      event.target.selectedOptions,
      (option) => option.value,
    );

    if (values.some((value) => value === "all")) {
      setDogIds(["all"]);
    } else {
      setDogIds(values);
    }
  };
  const handleClosePopUp = () => {
    setErrorMessage("");
  };
  const handlePhotoInput = (event) => {
    const photo = event.target.files[0];

    if (!photo) {
      setPhoto(null);
      return;
    }

    const photoSize = photo.size;

    if (LIMIT_FILE_SIZE < photoSize) {
      setErrorMessage("5MB 이상의 파일은 업로드 할 수 없습니다");
      setPhoto(null);
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPhoto(fileReader.result);
      };
      fileReader.readAsDataURL(photo);
    }
  };
  const handleContentInput = (event) => {
    setContent(event.target.value);
  };
  const handlePostSubmit = (event) => {
    event.preventDefault();

    if (shouldFetch) {
      return;
    }

    let message = "";

    if (!id && !photo) {
      message += "사진을 추가해주세요\n";
    }

    if (!content) {
      message += "게시할 내용을 추가해주세요\n";
    }

    if (message) {
      setErrorMessage(message);
    } else {
      setShouldFetch(true);
    }
  };

  const options = optionDatum.map(({ value, content }) => {
    return <option key={value} value={value}>{content}</option>;
  });

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

      <ModalHeader className={styles.header} text="글쓰기">
        <CloseButton
          className={styles.CloseButtonContainer}
          onClick={handleModalClose}
        />
        <div className={styles.inputButtonsContainer}>
          <InputButton
            className={styles.button}
            text={id ? "수정" : "추가"}
            form="postForm"
          />
          <InputButton
            className={styles.button}
            text="취소"
            type="button"
            onClick={handlePostCancel}
          />
        </div>
      </ModalHeader>
      <form
        id="postForm"
        className={styles.form}
        onSubmit={handlePostSubmit}
      >
        <label className={styles.selectLabel}>
          선택
          <select
            className={styles.select}
            value={dogIds}
            onChange={handleDogNameSelect}
            multiple
          >
            {options}
          </select>
        </label>
        <Input
          inputClassName={styles.photoInput}
          labelClassName={styles.photoInputLabel}
          title="사진"
          inputAttr={{
            type: "file",
            accept: "image/png, image/jpeg, image/jpg",
            onChange: handlePhotoInput,
          }}
        />
        <div className={styles.photoContainer}>
          <img
            className={styles.photo}
            src={photo}
            alt="post"
            style={{ display: photo ? "" : "none"}}
          />
        </div>
        <textarea
          className={styles.textarea}
          placeholder="게시할 내용을 입력해주세요. :)"
          value={content}
          onInput={handleContentInput}
        />
      </form>
    </Container>
  );
};

export default PostForm;
