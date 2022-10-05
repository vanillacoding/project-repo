import React from "react";
import PropTypes from "prop-types";

import { styled } from "../config/stitches.config";

import SubTitle from "./shared/SubTitle";
import ContainerStyled from "./shared/Container";
import { TransitionButton } from "./shared/TransitionButton";

const TranslationContainer = styled(ContainerStyled, {});

const TextBox = styled("p", {
  color: "$black",
  padding: "10px",
  fontSize: "20px",
  borderRadius: "10px",

  variants: {
    color: {
      blue: { color: "$blue" },
      lightBlue: { color: "$lightBlue" },
      apricot: { color: "$apricot" },
      white: { color: "$white" },
    },

    fontSize: {
      big: { fontSize: "30px" },
      small: { fontSize: "10px" },
    },

    border: {
      black: {
        border: "1px solid $black",
      },
    },
  },
});

const Textarea = styled("textarea", {
  width: "auto",
  padding: "10px",
  overflow: "auto",
  fontSize: "20px",
  wordWrap: "break-word",
  borderRadius: "10px",
  border: "1px solid $black",

  variants: {
    fontSize: {
      big: { fontSize: "20px" },
      small: { fontSize: "15px" },
    },
  },
});

const OriginWord = styled("span", {
  borderRadius: "3px",
  padding: "1px 3px",
  backgroundColor: "rgb(224 240 255)",
});

const TargetWord = styled(OriginWord, {
  backgroundColor: "#f6f6f6",
});

const WordPair = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

export default function Translation({
  handleClickGoogleTranslate,
  handleChangeTextarea,
  translationResult,
  originText,
  isOnWebPage,
}) {
  const { translation, notification, glossary } = translationResult;
  const glossaryEntries = Object.entries(glossary || {});

  return (
    <TranslationContainer
      flex="column"
      border="black"
      css={{
        marginTop: "20px",
        marginBottom: "20px",
        border: "none",
        padding: 0,
      }}
    >
      <ContainerStyled flex="column" css={{ padding: 0 }}>
        <SubTitle fontSize="middle" css={{ color: "$blue" }}>
          번역할 문장
        </SubTitle>

        <Textarea
          type="text"
          placeholder="번역할 문장을 입력해주세요."
          onChange={handleChangeTextarea}
          readOnly={isOnWebPage}
          fontSize={isOnWebPage ? "small" : "big"}
        >
          {originText}
        </Textarea>
      </ContainerStyled>

      <ContainerStyled flex="column" css={{ padding: 0 }}>
        <SubTitle fontSize="middle" css={{ color: "$blue" }}>
          번역 결과{" "}
          {notification && notification !== "구글 API" && (
            <TransitionButton onClick={handleClickGoogleTranslate}>
              내 용어집으로 번역하기
            </TransitionButton>
          )}
        </SubTitle>
        {notification && (
          <SubTitle fontSize="middle" color="apricot">
            {notification} 에서 찾은 번역 결과입니다.
          </SubTitle>
        )}

        <TextBox fontSize="middle" border="black">
          {translation || "번역 결과가 표시됩니다."}
        </TextBox>

        {glossaryEntries.length > 0 && <SubTitle>사용한 용어집</SubTitle>}

        <ContainerStyled flex="column" css={{ padding: 0, gap: "10px" }}>
          {glossaryEntries.map(([origin, target]) => (
            <WordPair key={origin}>
              <OriginWord>{origin}</OriginWord>
              <div>{"---->"}</div>
              <TargetWord>{target}</TargetWord>
            </WordPair>
          ))}
        </ContainerStyled>
      </ContainerStyled>
    </TranslationContainer>
  );
}

Translation.propTypes = {
  originText: PropTypes.string,
  translationResult: PropTypes.objectOf({
    translation: PropTypes.string,
    notification: PropTypes.string,
  }),
  handleChangeTextarea: PropTypes.func,
  handleClickGoogleTranslate: PropTypes.func.isRequired,
  isOnWebPage: PropTypes.bool,
};

Translation.defaultProps = {
  originText: "",
  translationResult: {
    translation: "",
    notification: "",
  },
  isOnWebPage: false,
  handleChangeTextarea: () => {},
};
