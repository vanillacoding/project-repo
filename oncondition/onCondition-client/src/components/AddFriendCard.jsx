import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";
import CardContainer from "./CardContainer";

const AddButton = styled.button`
  position: relative;
  width: 100%;
  border: none;
  border-radius: 50%;
  padding-top: 40%;
  margin: 10% 0;
  background-color: transparent;
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.fontSizes.medium};

  p {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

function AddFriendCard({ onClick }) {
  return (
    <CardContainer color={theme.background.sub}>
      <AddButton type="button" onClick={onClick}>
        +
      </AddButton>
      <p>Add my friend</p>
    </CardContainer>
  );
}

AddFriendCard.propTypes = {
  onClick: PropTypes.func,
};

export default AddFriendCard;
