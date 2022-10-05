import React from "react";
import PropTypes from "prop-types";
import { BsArrowRight } from "react-icons/bs";

import ContainerStyled from "./shared/Container";
import Button from "./shared/Button";
import Col from "./shared/Col";

function GlossaryList({ glossaries, buttonColor, buttonText, onButtonClick }) {
  return (
    <>
      {Object.keys(glossaries).map((text) => {
        return (
          <ContainerStyled
            key={text}
            id={text}
            justify="spaceEvenly"
            align="itemCenter"
          >
            <Col name="text" grid="col2">
              {text}
            </Col>
            <p>
              <BsArrowRight />
            </p>
            <Col name="translation" grid="col2">
              {glossaries[text]}
            </Col>

            <Col grid="col1">
              <Button
                size="small"
                type="button"
                borderColor={buttonText === "추가" ? "" : "red"}
                fontColor={buttonText === "추가" ? "white" : "red"}
                bgColor={buttonColor === "primary" ? "lightBlue" : "white"}
                onClick={() => onButtonClick(text, glossaries[text])}
              >
                {buttonText}
              </Button>
            </Col>
          </ContainerStyled>
        );
      })}
    </>
  );
}

GlossaryList.defaultProps = {
  buttonColor: "primary",
};

GlossaryList.propTypes = {
  glossaries: PropTypes.objectOf(PropTypes.string).isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  buttonColor: PropTypes.string,
};

export default GlossaryList;
