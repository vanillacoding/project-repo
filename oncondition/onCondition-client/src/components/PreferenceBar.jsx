import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from "../theme";
import Button from "./Button";

const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HEIGHT = 100;

const TextContainer = styled.div`
  display: inline-block;
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.background.main};
  width: 500px;
  height: ${HEIGHT}px;
  color: ${({ theme }) => theme.text.sub};
  line-height: ${HEIGHT}px;
  font-size: ${({ theme }) => theme.fontSizes.small};

  @media screen and (max-width: 650px) {
    width: calc(80% - 100px);
  }
`;

const BUTTON_WIDTH = 100;

function PreferenceBar({
  value,
  buttonText,
  onButtonClick,
}) {
  return (
    <BarWrapper>
      <TextContainer
        lineColor={theme.point.main}
      >{value}</TextContainer>
      <Button
        width={BUTTON_WIDTH}
        height={HEIGHT}
        onClick={onButtonClick}
        text={buttonText}
        backgroundColor={theme.background.sub}
      />
    </BarWrapper>
  );
}

PreferenceBar.propTypes = {
  value: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default PreferenceBar;
