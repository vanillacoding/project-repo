import React, { useEffect, useRef, useState } from "react";
import { css, globalCss, styled } from "../config/stitches.config";
import {
  getTranslationResult,
  googleTranslate,
} from "../services/translationService";
import chromeStore from "../utils/chromeStore";
import Button from "./shared/Button";
import ContainerStyled from "./shared/Container";
import ErrorStyled from "./shared/Error";
import Translation from "./Translation";

const PageTranslationContainer = styled(ContainerStyled, {
  position: "absolute",
  backgroundColor: "transparent",
  zIndex: "9999",
  maxWidth: "500px",
  padding: "10px",
});

const initialBoxPosition = {
  left: 0,
  top: 0,
};

const [RESIZE_X, RESIZE_Y] = [400, 600];
const SCREEN_HALF_RATIO = 0.5;

export default function TextSelection() {
  const [user, setUser] = useState(null);

  const boxRef = useRef();
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState(initialBoxPosition);

  const [textSelected, setTextSelected] = useState("");
  const [translationResult, setTranslationResult] = useState({});

  const [isSelectionEnd, setIsSelectionEnd] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const userData = await chromeStore.get("userData");

      setUser(userData);
    })();

    const handleMouseup = ({ pageX, pageY }) => {
      setIsSelectionEnd(true);

      if (!isBoxVisible) {
        setTextSelected(document.getSelection().toString().trim());
      }

      if (!isButtonClicked) {
        setBoxPosition({ left: pageX, top: pageY });
      }
    };

    const handleMousedown = () => {
      setIsSelectionEnd(false);
      setIsButtonClicked(false);
    };

    const handleClickOutside = ({ target }) => {
      if (isBoxVisible && !boxRef.current?.contains(target)) {
        setIsButtonClicked(false);
        setIsBoxVisible(false);
        setTextSelected("");
      }
    };

    document.addEventListener("mouseup", handleMouseup);
    document.addEventListener("mousedown", handleMousedown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleMouseup);
      document.removeEventListener("mousedown", handleMousedown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isBoxVisible, boxRef]);

  const handleClickTranslate = async ({
    pageX,
    pageY,
    clientX,
    clientY,
    view: { innerHeight, innerWidth },
  }) => {
    setErrorMessage("");
    setIsBoxVisible(true);
    setIsButtonClicked(true);
    const left =
      clientX / innerWidth < SCREEN_HALF_RATIO ? pageX : pageX - RESIZE_X;
    const top =
      clientY / innerHeight < SCREEN_HALF_RATIO ? pageY : pageY - RESIZE_Y;
    setBoxPosition({ left, top });

    try {
      const result = await getTranslationResult(user, textSelected);

      setTranslationResult(result);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleClickGoogleTranslate = async () => {
    try {
      const result = await googleTranslate(user, textSelected);

      setTranslationResult(result);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  globalCss(css);

  return (
    user && (
      <PageTranslationContainer ref={boxRef} css={boxPosition} flex="column">
        {isBoxVisible ? (
          <ContainerStyled css={{ border: "1px solid $blue" }}>
            {errorMessage && (
              <ErrorStyled>{JSON.stringify(errorMessage)}</ErrorStyled>
            )}
            <Translation
              originText={textSelected}
              translationResult={translationResult}
              handleClickGoogleTranslate={handleClickGoogleTranslate}
              isOnWebPage
            />
          </ContainerStyled>
        ) : (
          textSelected &&
          isSelectionEnd && (
            <Button
              bgColor="lightBlue"
              size="translationButton"
              onMouseDown={handleClickTranslate}
            >
              🖐
            </Button>
          )
        )}
      </PageTranslationContainer>
    )
  );
}
