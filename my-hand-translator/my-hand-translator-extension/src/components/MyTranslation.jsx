import React from "react";
import PropTypes from "prop-types";

import { HiTranslate } from "react-icons/hi";
import { BiTransferAlt } from "react-icons/bi";
import { RiExternalLinkLine } from "react-icons/ri";
import { FaMinusCircle } from "react-icons/fa";

import Container from "./shared/Container";

import { styled } from "../config/stitches.config";

const TranslationsContainer = styled(Container, {
  padding: "1em 1.5em",
  margin: "1.5em 0",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  wordBreak: "break-all",
  position: "relative",

  "@tabMedium": {
    flexDirection: "column",
  },
});

const FlexColumContainer = styled(Container, {
  padding: "0 10px",
  "@tabMedium": {
    flexDirection: "column",
  },
});

const FlexColumnContent = styled(Container, {
  paddingLeft: "0",
  paddingRight: "0",
  flex: "1 1 33%",
});

const SvgStyled = styled(Container, {
  padding: "10px 15px",
});

const LinkStyled = styled("a", {
  textDecoration: "none",

  "&:visited": {
    color: "#1D8FF2",
  },
});

const ButtonStyled = styled("button", {
  backgroundColor: "#FBFBFB",
  border: "0",
  outline: "0",
  cursor: "pointer",
  padding: "8px",
  "&:hover": {
    backgroundColor: "rgba(234, 68, 53, 0.2)",
  },
  borderRadius: "50%",
  transition: "background-color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
});

function MyTranslation({ translation, onClick }) {
  return (
    <>
      <TranslationsContainer
        justify="center"
        align="center"
        alignContent="start"
      >
        <div>
          <Container justify="spaceBetween" align="center">
            <HiTranslate size="24px" color="#1A6DD9" />
            <ButtonStyled type="button" onClick={() => onClick(translation)}>
              <FaMinusCircle size="24px" color="#EA4435" />
            </ButtonStyled>
          </Container>

          <FlexColumContainer>
            <FlexColumnContent alignContent="start">
              <p>{translation.origin}</p>
            </FlexColumnContent>

            <SvgStyled align="center">
              <BiTransferAlt size="28px" color="#1D8FF2" />
            </SvgStyled>

            <FlexColumnContent alignContent="start">
              <p>{translation.translated}</p>
            </FlexColumnContent>
          </FlexColumContainer>

          <Container justify="end">
            <LinkStyled href={translation.url}>
              <RiExternalLinkLine size="24px" />
            </LinkStyled>
          </Container>
        </div>
      </TranslationsContainer>
    </>
  );
}

MyTranslation.defaultProps = {
  translation: PropTypes.object,
  onClick: PropTypes.func,
};

MyTranslation.propTypes = {
  translation: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    translated: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
};

export default MyTranslation;
