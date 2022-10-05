import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import Title from "./shared/Title";
import Container from "./shared/Container";
import ErrorStyled from "./shared/Error";
import TabContainer from "./shared/TabContainer";
import Button from "./shared/Button";
import OtherGlossary from "./OtherGlossary";

import { getGlossaries } from "../services/glossaryService";
import { styled } from "../config/stitches.config";

import debounce from "../utils/utils";

const FormContent = styled("form", {
  "& input": {
    marginRight: "0.5em",
  },
});

const DEFAULT_LIMIT = 5;
const DEBOUNCE_DELAY = 500;

export default function OtherGlossaries() {
  const [error, setError] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [glossaries, setGlossaries] = useState([]);
  const [hasServiceAccess, setHasServiceAccess] = useState(null);

  const user = useSelector((state) => state.user);
  const observedElement = useRef();

  useEffect(() => {
    (async () => {
      const { isServerOn } = user;

      setHasServiceAccess(isServerOn);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const serverGlossaries = await getGlossaries(
          currentPage,
          DEFAULT_LIMIT,
        );

        setGlossaries([...glossaries, ...serverGlossaries]);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [currentPage]);

  useEffect(() => {
    const handleObserver = (entries) => {
      const target = entries[0];

      const debounceSetSplitIndex = debounce(() => {
        setCurrentPage((prevState) => prevState + 1);
      }, DEBOUNCE_DELAY);

      if (target.isIntersecting) {
        debounceSetSplitIndex(currentPage);
      }
    };

    const currentObservedElement = observedElement.current;
    const observer = new IntersectionObserver(handleObserver);

    if (currentObservedElement) {
      observer.observe(currentObservedElement);
    }

    return () => {
      observer.unobserve(currentObservedElement);
    };
  }, []);

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const handleSearchButtonClick = async () => {
    if (!searchValue) {
      return setError("검색어를 입력해주세요.");
    }

    const serverGlossaries = await getGlossaries(
      currentPage,
      DEFAULT_LIMIT,
      searchValue,
    );

    setGlossaries(serverGlossaries);
    return setIsSearched(true);
  };

  if (!hasServiceAccess) {
    return (
      <TabContainer>
        <ErrorStyled>해당 서비스는 서버 연결이 필요합니다.</ErrorStyled>
      </TabContainer>
    );
  }

  return (
    <>
      <Container justify="center" align="itemCenter">
        <Title>다른 사람 용어집 목록</Title>
      </Container>

      <TabContainer>
        <Container justify="spaceBetween" align="itemCenter">
          <ErrorStyled>{error}</ErrorStyled>

          <FormContent>
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              onChange={({ target }) => {
                handleSearchValue(target.value);
              }}
            />
            <Button
              size="small"
              type="button"
              onClick={handleSearchButtonClick}
            >
              검색
            </Button>
          </FormContent>
        </Container>

        <div>
          {glossaries.length !== 0 &&
            glossaries.map((glossary) => {
              return (
                <OtherGlossary
                  key={glossary.glossary.updatedAt}
                  glossary={glossary}
                >
                  test
                </OtherGlossary>
              );
            })}
        </div>

        {!isSearched && <div ref={observedElement} />}
      </TabContainer>
    </>
  );
}
