import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import validator from "validator";

import { LIMIT_FILE_SIZE, DEFAULT_ERROR_MESSAGE } from "../constants/constants";
import getBase64FromImageAsync from "../utils/getBase64FromImageAsync";
import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";
import concatStrings from "../utils/concatStrings";

import styles from "./styles/DogForm.module.css";
import Container from "./shared/Container";
import Input from "./shared/Input";
import InputButton from "./shared/InputButton";
import ModalHeader from "./shared/ModalHeader";
import PopUpWindow from "./shared/PopUpWindow";
import CloseButton from "./shared/CloseButton";

const DogForm = () => {
  const [dogForm, setDogForm] = useState(null);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const { modal } = history.location.state;
  const imgRef = useRef(null);
  const genderRef = useRef(null);
  const adoptionStatusRef = useRef(null);
  const dogCharacterRef = useRef(null);

  useEffect(() => {
    if (!shouldFetch || !dogForm) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const addNewDog = async () => {
      try {
        const { photo } = dogForm;
        const base64 = await getBase64FromImageAsync(photo);
        const copiedDogForm = { ...dogForm, photo: base64 };
        const response = await fetch(
          `${serverUrl}/dog/new`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(copiedDogForm),
            credentials: "include",
            signal,
          },
        );

        const { message } = await response.json();

        if (message === "ok") {
          history.push("/dogs", { modal });
        } else {
          setDogForm(null);
          setShouldFetch(false);
          setErrorMessage(message);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setDogForm(null);
        setShouldFetch(false);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    };

    const editDog = async () => {
      try {
        const { photo } = dogForm;
        const base64 = await getBase64FromImageAsync(photo);
        const copiedDogForm = { ...dogForm, photo: base64 };

        const response = await fetch(
          `${serverUrl}/dog/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(copiedDogForm),
            credentials: "include",
            signal,
          },
        );

        const { message } = await response.json();

        if (message === "ok") {
          history.push("/dogs", { modal });
        } else {
          setDogForm(null);
          setShouldFetch(false);
          setErrorMessage(message);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setDogForm(null);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    };

    if (id) {
      editDog();
    } else {
      addNewDog();
    }

    return () => {
      controller.abort();
    }
  }, [dogForm, history, id, modal, shouldFetch]);

  useEffect(() => {
    if (!id) {
      return;
    }

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
        const {
          name,
          gender,
          breed,
          age,
          weight,
          heart_worm: heartWorm,
          neutering,
          entranced_at,
          adoption_status: adoptionStatus,
          photo,
          character: dogCharacter,
          description,
        } = result;

        if (message === "ok") {
          imgRef.current.src = photo.url;
          genderRef.current.value = gender;
          adoptionStatusRef.current.value = adoptionStatus;
          dogCharacterRef.current.value = dogCharacter;
          const dogInformation = {
            name,
            gender,
            breed,
            age,
            weight,
            heartWorm,
            neutering,
            entrancedAt: entranced_at.split("T")[0],
            adoptionStatus,
            dogCharacter,
            description,
          };

          setDogForm(dogInformation);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
        setDogForm(null);
      }
    };

    getDogInformation();
  }, [id]);

  useEffect(() => {
    if (!shouldDelete) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const deleteDogInformation = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/dog/${id}`,
          {
            method: "DELETE",
            credentials: "include",
            signal,
          },
        );

        const { message } = await response.json();

        if (message === "ok") {
          history.push("/dogs", { modal });
        } else {
          setErrorMessage(message);
          setShouldDelete(false);
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
        setShouldDelete(false);
      }
    };

    deleteDogInformation();

    return () => controller.abort();
  }, [shouldDelete, history, id, modal]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (shouldFetch) {
      return;
    }

    const formData = new FormData(event.target);
    const dogInformation = {
      name: formData.get("name").trim(),
      gender: formData.get("gender"),
      breed: formData.get("breed").trim(),
      age: Number(formData.get("age")),
      weight: Number(formData.get("weight")),
      heartWorm: !!formData.get("heartWorm"),
      neutering: !!formData.get("neutering"),
      entrancedAt: new Date(formData.get("entrancedAt")).toISOString(),
      adoptionStatus: formData.get("adoptionStatus"),
      photo: formData.get("photo"),
      dogCharacter: formData.get("dogCharacter"),
      description: formData.get("description"),
    };

    let message = "";

    if (validator.isEmpty(dogInformation.name)) {
      message += "이름을 입력해 주세요\n";
    }

    if (validator.isEmpty(dogInformation.breed)) {
      message += "견종을 입력해 주세요\n";
    }

    if (validator.isEmpty(dogInformation.dogCharacter)) {
      message += "캐릭터를 입력해 주세요\n";
    }

    if (message) {
      setErrorMessage(message);
    } else {
      setDogForm(dogInformation);
      setShouldFetch(true);
    }
  };
  const handlePopUpClose = () => {
    setErrorMessage("");
    setDeleteMessage("");
  };
  const handleModalClose = () => {
    history.push("/");
  };
  const handleFormCancel = () => {
    history.goBack();
  };
  const handleImageLoad = ({target: $img }) => {
    $img.style.display = "block";
  };
  const handlePhotoInput = (event) => {
    const photo = event.target.files[0];

    if (!photo) {
      imgRef.current.src = "";
      imgRef.current.style.display = "none";
      return;
    }

    const photoSize = photo.size;

    if (LIMIT_FILE_SIZE < photoSize) {
      setErrorMessage("5MB 이상의 파일은 업로드 할 수 없습니다");
      event.target.value = "";
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        imgRef.current.src = fileReader.result;
        imgRef.current.style.display = "";
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleDogDelete = () => {
    setDeleteMessage("");
    setShouldDelete(true);
  };
  const handleDeletionPopUp = () => {
    if (shouldDelete) {
      return;
    }

    setDeleteMessage("정말 삭제하시겠습니까?");
  };

  return (
    <Container className={styles.container}>
      {errorMessage
        ? <PopUpWindow
            className={styles.popUp}
            text={errorMessage}
            onClick={handlePopUpClose}
          />
        : null
      }
      {deleteMessage
        ? <PopUpWindow
            className={styles.popUp}
            text={deleteMessage}
            onClick={handlePopUpClose}
          >
            <InputButton
              className={styles.confirmButton}
              text="확인"
              type="button"
              onClick={handleDogDelete}
            />
          </PopUpWindow>
        : null
      }
      <ModalHeader className={styles.modalHeader} text="강아지 추가">
        <CloseButton
          className={styles.closeButton}
          onClick={handleModalClose}
        />
        <div className={styles.inputButtonsContainer}>
          <InputButton className={styles.editButton} text={id ? "수정" : "추가"} form="dogForm" />
          {id
            ? <InputButton
                className={styles.editButton}
                text="삭제"
                type="button"
                onClick={handleDeletionPopUp}
              />
            : null
          }
          <InputButton
            className={styles.editButton}
            text="취소"
            type="button"
            onClick={handleFormCancel}
          />
        </div>
      </ModalHeader>
      <form id="dogForm" className={styles.form} onSubmit={handleSubmit}>
        <Input
          labelClassName={styles.fontSize}
          title="이름"
          inputAttr={{
            name: "name",
            defaultValue: dogForm?.name,
          }}
        />
        <div
          className={concatStrings(styles.selectContainer, styles.marginTop)}
        >
          <label className={styles.fontSize} htmlFor="gender">
            성별
          </label>
          <select
            id="gender"
            className={styles.select}
            name="gender"
            ref={genderRef}
          >
            <option value="male">수컷</option>
            <option value="female">암컷</option>
          </select>
        </div>
        <Input
          title="견종"
          labelClassName={styles.fontSize}
          inputClassName={styles.marginTop}
          inputAttr={{
            name: "breed",
            defaultValue: dogForm?.breed
          }}
        />
        <Input
          title="나이"
          inputClassName={styles.marginTop}
          labelClassName={styles.fontSize}
          inputAttr={{
            name: "age",
            type: "number",
            defaultValue: dogForm?.age
          }}
        />
        <Input
          title="무게(Kg)"
          inputClassName={styles.marginTop}
          labelClassName={styles.fontSize}
          inputAttr={{
            type: "number",
            name: "weight",
            defaultValue: dogForm?.weight
          }}
        />
        <div className={styles.checkboxesContainer}>
          <Input
            title="심장사상충"
            labelClassName={styles.fontSize}
            inputAttr={{
              name: "heartWorm",
              type: "checkbox",
              defaultValue: dogForm?.heartWorm,
            }}
          />
          <Input
            title="중성화"
            labelClassName={styles.fontSize}
            inputAttr={{
              name: "neutering",
              type: "checkbox",
              defaultValue: dogForm?.neutering
            }}
          />
        </div>
        <Input
          title="입소일"
          labelClassName={styles.fontSize}
          inputClassName={concatStrings(styles.marginTop,styles.dateInput)}
          inputAttr={{
            name: "entrancedAt",
            type: "date",
            defaultValue: dogForm?.entrancedAt
          }}
        />
        <div className={styles.selectContainer}>
          <label
            className={styles.fontSize}
            htmlFor="adoptionStatus"
          >
            입양 상태
          </label>
          <select
            id="adoptionStatus"
            className={styles.select}
            name="adoptionStatus"
            ref={adoptionStatusRef}
          >
            <option value="ready">
              준비 중
            </option>
            <option value="wait">
              기다리는 중
            </option>
            <option value="completed">
              완료
            </option>
          </select>
        </div>
        <Input
          title="사진"
          labelClassName={concatStrings(styles.photoLabel, styles.fontSize)}
          inputClassName={concatStrings(styles.photoInput, styles.marginTop)}
          inputAttr={{
            type: "file",
            accept: "image/png, image/jpeg, image/jpg",
            name: "photo",
            required: id ? false : true,
            onChange: handlePhotoInput,
          }}
        />
        <img
          onLoad={handleImageLoad}
          className={concatStrings(styles.thumnail, styles.marginTop)}
          ref={imgRef}
          alt="dog profile thumnail"
        />
        <div className={styles.selectContainer}>
          <label
            className={concatStrings(styles.selectLabel, styles.fontSize)} 
            htmlFor="dogCharacter"
          >
            캐릭터
          </label>
          <select
            id="dogCharacter"
            className={styles.select}
            name="dogCharacter"
            ref={dogCharacterRef}
          >
            <option value="brownShiba">
              갈색 시바견
            </option>
            <option value="darkShiba">
              검정 시바견
            </option>
            <option value="grayShiba">
              회색 시바견
            </option>
          </select>
        </div>
        <div className={styles.textareaContainer}>
          <label
            className={styles.textareaLabel}
            htmlFor="description"
          >
            설명
          </label>
          <textarea
            id="description"
            className={styles.textarea}
            name="description"
            defaultValue={dogForm?.description}
          />
        </div>
      </form>
    </Container>
  );
};

export default DogForm;
