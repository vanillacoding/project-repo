import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@stitches/react";

import GlossaryList from "./GlossaryList";
import Button from "./shared/Button";
import Container from "./shared/Container";
import TabContainer from "./shared/TabContainer";
import Title from "./shared/Title";
import SubTitle from "./shared/SubTitle";
import ErrorStyled from "./shared/Error";

import chromeStore from "../utils/chromeStore";
import { convertObjectToCsv } from "../utils/convert";
import {
  createGlossaryFromGoogleTranslation,
  getGlossaryFromServer,
  updateCsvFromGoogleStorage,
  updateGlossaryFromServer,
} from "../services/glossaryService";

const GlossaryListWrap = styled("div", {
  flex: 1,
});

const SubTitleStyled = styled(SubTitle, {
  display: "inline-block",
  padding: "10px",
  backgroundColor: "#D5D9DC",
  color: "white",
});

const Divide = styled("div", {
  variants: {
    pad: {
      left: { paddingRight: "20px" },
      right: {
        paddingRight: "20px",
        borderRight: "2px solid #e5e5e5",
      },
    },
  },
});

function DetailOtherGlossary() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMassage, setErrorMassage] = useState(null);
  const [myGlossary, setMyGlossary] = useState(null);
  const [otherGlossary, setOtherGlossary] = useState(null);
  const [hasServiceAccess, setHasServiceAccess] = useState(null);

  const user = useSelector((state) => state.user);

  const { userId: otherEmail } = useParams();
  const userId = otherEmail.split("@")[0];

  useEffect(() => {
    (async () => {
      try {
        const { email: myEmail, isServerOn } = user;

        setHasServiceAccess(isServerOn);

        if (isServerOn) {
          const myGlossaryData = await getGlossaryFromServer(
            { userId: myEmail },
            setErrorMassage,
          );

          const otherGlossaryData = await getGlossaryFromServer(
            { userId: otherEmail },
            setErrorMassage,
          );

          setMyGlossary(myGlossaryData);
          setOtherGlossary(otherGlossaryData);
        }
      } catch (error) {
        setErrorMassage(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleAddGlossary = (text, translation) => {
    setMyGlossary({
      ...myGlossary,
      [text]: translation,
    });
  };

  const handleDeleteGlossary = (text) => {
    const newGlossary = { ...myGlossary };

    delete newGlossary[text];

    setMyGlossary(newGlossary);
  };

  const mergeGlossary = () => {
    const newMyGlossary = { ...myGlossary };
    const newOtherGlossary = { ...otherGlossary };

    Object.assign(newMyGlossary, newOtherGlossary);

    setMyGlossary(newMyGlossary);
  };

  const applyGlossary = async () => {
    setIsLoading(true);

    const { projectId, bucketId } = user;

    const glossaryId = await chromeStore.get("glossaryId");
    const myGlossaryToCsv = convertObjectToCsv(myGlossary);

    await updateCsvFromGoogleStorage(
      { csv: myGlossaryToCsv, bucketId },
      errorMassage,
    );

    await createGlossaryFromGoogleTranslation(
      { projectId, bucketId },
      setErrorMassage,
    );

    await updateGlossaryFromServer(
      { glossaryId, glossary: myGlossary },
      errorMassage,
    );

    const newUserData = {
      ...user,

      glossaryId,
      glossary: myGlossary,
      bucketId,
    };

    await chromeStore.set("userData", newUserData);
    setIsLoading(false);
  };

  if (!hasServiceAccess) {
    return (
      <TabContainer>
        <ErrorStyled>해당 서비스는 서버 연결이 필요합니다.</ErrorStyled>
      </TabContainer>
    );
  }

  if (isLoading) {
    return <TabContainer>로딩 중...</TabContainer>;
  }

  return (
    <TabContainer>
      <Container justify="spaceBetween">
        <Container justify="center" align="center">
          <Title>다른 사람의 용어집</Title>
        </Container>
        <div>
          <Button
            bgColor="blue"
            size="medium"
            css={{ margin: "10px" }}
            onClick={mergeGlossary}
          >
            병합하기
          </Button>
          <Button
            bgColor="blue"
            size="medium"
            css={{ margin: "10px" }}
            onClick={applyGlossary}
          >
            적용하기
          </Button>
        </div>
      </Container>

      <ErrorStyled css={{ height: "16px" }}>{errorMassage}</ErrorStyled>

      <Container justify="spaceBetween">
        <GlossaryListWrap>
          <Container justify="center" align="center">
            <SubTitleStyled align="center">내 용어집</SubTitleStyled>
          </Container>

          <Divide pad="right">
            <GlossaryList
              glossaries={myGlossary}
              buttonText="삭제"
              buttonColor="warning"
              onButtonClick={handleDeleteGlossary}
            />
          </Divide>
        </GlossaryListWrap>

        <GlossaryListWrap>
          <Container justify="center" align="center">
            <SubTitleStyled align="center">{userId}의 용어집</SubTitleStyled>
          </Container>

          <Divide pad="left">
            <GlossaryList
              glossaries={otherGlossary}
              buttonText="추가"
              onButtonClick={handleAddGlossary}
            />
          </Divide>
        </GlossaryListWrap>
      </Container>
    </TabContainer>
  );
}

export default DetailOtherGlossary;
