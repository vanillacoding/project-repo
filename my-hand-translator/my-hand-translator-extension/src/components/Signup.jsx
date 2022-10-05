import React, { useState } from "react";
import PropTypes from "prop-types";

import ContainerStyled from "./shared/Container";
import SubTitle from "./shared/SubTitle";
import ErrorStyled from "./shared/Error";
import Button from "./shared/Button";

import { signup } from "../services/userService";
import { DEFAULT_KEYWORDS } from "../constants/user";
import chromeStore from "../utils/chromeStore";

export default function Signup({ handleSignupResult, user }) {
  const [userKeywords, setUserKeywords] = useState(["default"]);
  const [extraKeywords, setExtraKeywords] = useState([]);
  const [extraKeyword, setExtraKeyword] = useState("");
  const [error, setError] = useState("");

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const newUser = { ...user, glossary: user.glossary ?? {} };
      const totalKeywords = [...new Set([...userKeywords, ...extraKeywords])];
      const signupResult = await signup(newUser, totalKeywords);

      if (signupResult.result === "ok") {
        const userWithGlossaryId = {
          ...user,
          glossaryId: signupResult.glossaryId,
        };

        await chromeStore.set("userData", userWithGlossaryId);

        return handleSignupResult(true);
      }

      handleSignupResult(false);

      return setError(signupResult.error.message);
    } catch (err) {
      return setError(err.message);
    }
  };

  const handleCheckKeyword = ({ target: { name, checked } }) => {
    if (checked) {
      setUserKeywords((prev) => prev.concat(name));
    } else {
      setUserKeywords((prev) => prev.filter((value) => value !== name));
    }
  };

  const handleAddExtraKeyword = () => {
    setExtraKeyword((prevExtraKeyword) => {
      setExtraKeywords((prev) => prev.concat(prevExtraKeyword));
      return "";
    });
  };

  const handleChangeExtraKeyword = ({ target: { value } }) => {
    setExtraKeyword(value);
  };

  return (
    <ContainerStyled flex="column" size="medium">
      <SubTitle fontSize="big">사용자 등록 폼</SubTitle>
      <p>*키워드 입력 없이 회원 가입 가능합니다.</p>
      <ErrorStyled>{error}</ErrorStyled>

      <form onSubmit={handleSubmitForm}>
        <p>자신의 용어집에 라벨링할 키워드입니다.</p>
        <ContainerStyled flex="column">
          {DEFAULT_KEYWORDS.map((keyword) => (
            <label key={keyword} htmlFor="name">
              {keyword}
              <input
                name={keyword}
                type="checkbox"
                onChange={handleCheckKeyword}
              />
            </label>
          ))}
          <SubTitle fontSize="middle">추가된 키워드</SubTitle>
          {extraKeywords.map((keyword) => (
            <div key={keyword}>{keyword}</div>
          ))}
          <input value={extraKeyword} onChange={handleChangeExtraKeyword} />
          <ContainerStyled flex="row" justify="spaceBetween">
            <Button
              type="button"
              bgColor="apricot"
              onClick={handleAddExtraKeyword}
            >
              키워드 추가
            </Button>
            <Button type="submit">사용자 등록하기</Button>
          </ContainerStyled>
        </ContainerStyled>
      </form>
    </ContainerStyled>
  );
}

Signup.propTypes = {
  handleSignupResult: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    glossary: PropTypes.objectOf(PropTypes.string),
    glossaryId: PropTypes.string,
    isServerOn: PropTypes.bool.isRequired,
    name: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    signed: PropTypes.string,
    translations: PropTypes.arrayOf(
      PropTypes.shape({
        origin: PropTypes.string.isRequired,
        translated: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        glossary: PropTypes.objectOf(PropTypes.string),
        createdAt: PropTypes.string.isRequired,
        nanoId: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};
