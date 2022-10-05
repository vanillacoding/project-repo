import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";

import GlossaryList from "./GlossaryList";
import Button from "./shared/Button";
import Title from "./shared/Title";
import SubTitle from "./shared/SubTitle";
import ErrorStyled from "./shared/Error";
import ContainerStyled from "./shared/Container";
import TabContainer from "./shared/TabContainer";
import Col from "./shared/Col";

import chromeStore from "../utils/chromeStore";
import { convertObjectToCsv } from "../utils/convert";
import {
  createBucket,
  createGlossaryFromGoogleTranslation,
  getCsvFromGoogleStorage,
  getGlossaryFromServer,
  updateCsvFromGoogleStorage,
  updateGlossaryFromServer,
} from "../services/glossaryService";
import { styled } from "../config/stitches.config";
import { OTHER_GLOSSARIES } from "../constants/url";

const Input = styled("input", {
  width: "80%",
});

const initWordsToAdd = {
  text: "",
  translation: "",
};

const DivStyled = styled(ContainerStyled, {
  flex: "1 1 80%",
});

function EditGlossary() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState(null);
  const [glossary, setGlossary] = useState({});
  const [hasBucket, setHasBucket] = useState(null);
  const [wordsToAdd, setWordsToAdd] = useState(initWordsToAdd);

  const focus = useRef(null);
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const { isServerOn, email, bucketId, projectId } = user;

  useEffect(() => {
    (async () => {
      const dataFromGoogle = await getCsvFromGoogleStorage(
        { bucketId },
        setErrorMassage,
      );

      setHasBucket(dataFromGoogle.hasBucket);

      if (isServerOn && dataFromGoogle.hasBucket) {
        const dataFromServer = await getGlossaryFromServer(
          { userId: email },
          setErrorMassage,
        );

        Object.assign(dataFromGoogle.glossaryData, dataFromServer);
      }

      setGlossary(dataFromGoogle.glossaryData);
      setIsLoading(false);
    })();
  }, []);

  const handleWordsChange = (event) => {
    const { name, value } = event.target;

    setErrorMassage(null);

    setWordsToAdd({
      ...wordsToAdd,
      [name]: value,
    });
  };

  const handleAddGlossary = (event) => {
    event.preventDefault();

    const { text, translation } = wordsToAdd;

    if (!text || !text.trim()) {
      return setErrorMassage("원문 단어를 입력해 주세요.");
    }

    if (!translation || !translation.trim()) {
      return setErrorMassage("번역 할 단어를 입력해 주세요.");
    }

    if (glossary[text] === translation) {
      return setErrorMassage("이미 등록되어 있습니다.");
    }

    setGlossary({
      ...glossary,
      [text]: translation,
    });

    setWordsToAdd(initWordsToAdd);

    return focus.current.focus();
  };

  const handleDeleteGlossary = (text) => {
    const newGlossary = { ...glossary };

    delete newGlossary[text];

    setGlossary(newGlossary);
  };

  const handleEditGlossary = async () => {
    setIsLoading(true);

    if (!hasBucket) {
      await createBucket({ bucketId, projectId }, setErrorMassage);
    }

    const glossaryToCsv = convertObjectToCsv(glossary);

    await updateCsvFromGoogleStorage(
      {
        csv: glossaryToCsv,
        bucketId,
      },
      setErrorMassage,
    );

    await createGlossaryFromGoogleTranslation(
      { projectId, bucketId },
      setErrorMassage,
    );

    if (isServerOn) {
      const glossaryId = await chromeStore.get("glossaryId");

      await updateGlossaryFromServer({ glossaryId, glossary }, setErrorMassage);
    }

    try {
      const newUserData = { ...user, glossary, bucketId };

      await chromeStore.set("userData", newUserData);
    } catch (error) {
      setErrorMassage(error);
    }

    setIsLoading(false);
    history.push(OTHER_GLOSSARIES);
  };

  if (isLoading) {
    return <TabContainer>로딩 중...</TabContainer>;
  }

  return (
    <TabContainer>
      <ContainerStyled justify="spaceBetween">
        <ContainerStyled justify="center" align="center">
          <Title>{user.glossary ? "용어집 편집" : "용어집 생성"}</Title>
        </ContainerStyled>
        <Button size="medium" bgColor="blue" onClick={handleEditGlossary}>
          제출
        </Button>
      </ContainerStyled>

      <ContainerStyled>
        <SubTitle>좌측 단어는 우측 단어로 번역됩니다.</SubTitle>
      </ContainerStyled>

      <ErrorStyled css={{ height: "16px" }}>{errorMassage}</ErrorStyled>

      <form onSubmit={handleAddGlossary}>
        <ContainerStyled justify="spaceEvenly" align="itemCenter">
          <Col grid="col2">
            <Input
              ref={focus}
              type="text"
              name="text"
              value={wordsToAdd.text}
              onChange={handleWordsChange}
              placeholder="text"
            />
          </Col>
          <p>
            <BsArrowRight />
          </p>
          <Col grid="col2">
            <Input
              type="text"
              name="translation"
              value={wordsToAdd.translation}
              onChange={handleWordsChange}
              placeholder="translation"
            />
          </Col>
          <Col grid="col1">
            <Button type="submit" size="small" bgColor="lightBlue">
              추가
            </Button>
          </Col>
        </ContainerStyled>
      </form>

      {glossary && (
        <GlossaryList
          glossaries={glossary}
          buttonText="삭제"
          buttonColor="warning"
          onButtonClick={handleDeleteGlossary}
        />
      )}
    </TabContainer>
  );
}

export default EditGlossary;
