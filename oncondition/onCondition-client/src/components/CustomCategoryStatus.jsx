import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Button";
import theme from "../theme";
import { DELETE } from "../constants/buttons";

const HEIGHT = 100;
const BUTTON_WIDTH = 100;
const BUTTON_COLOR = theme.background.main;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: inline-block;
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.background.sub};
  width: 500px;
  height: ${HEIGHT}px;
  color: ${({ theme }) => theme.text.sub};
  line-height: ${HEIGHT}px;
  font-size: ${({ theme }) => theme.fontSizes.small};

  @media screen and (max-width: 650px) {
    width: calc(80% - 100px);
  }
`;

function CustomCategoryStatus({
  category,
  onDeleteButtonClick,
}) {
  const handleDeleteButtonClick = function () {
    onDeleteButtonClick(category);
  };

  return (
    <StatusWrapper>
      <TextContainer
      >{category}</TextContainer>
      <Button
        onClick={handleDeleteButtonClick}
        text={DELETE}
        backgroundColor={BUTTON_COLOR}
        width={BUTTON_WIDTH}
        height={HEIGHT}
      />
    </StatusWrapper>
  );
}

CustomCategoryStatus.propTypes = {
  category: PropTypes.string,
  onDeleteButtonClick: PropTypes.func,
};

export default CustomCategoryStatus;
