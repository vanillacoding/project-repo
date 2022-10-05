import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import StyledButton from "./shared/StyledButton";

const Container = styled.div`
  position: relative;
`;

const display = css`
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        height: 20vh;
        padding: 0.2em;
      `;
    }

    return css`
      height: 0;
      border: none;
    `;
  }}
`;

const List = styled.div`
  display:flex;
  flex-direction: column;
  padding: 0.5rem;
  height: 100%;
  border-radius: 0.3rem;
  overflow-y: scroll;

  & > a {
    margin-top: 0.3rem;
  }
`;

const ListContainer = styled.div`
  width: 20vw;
  position: absolute;
  left: 50%;
  top: calc(100% + 1rem);
  border-radius: 0.3rem;
  background: ${(props) => props.theme.layoutBg3.color};
  border: 1px solid ${(props) => props.theme.layoutBorder1.color};
  overflow: hidden;
  transform: translateX(-50%);
  transition-property: height, padding;
  transition-duration: .3s;
  transition-timing-function: ease-in-out;
  z-index: 1;

  ${display}
`;

function DropDown({
  children,
  name,
  isOpen,
  toggle,
  onBlur,
}) {
  return (
    <Container onBlur={onBlur}>
      <StyledButton onClick={toggle}>
        {name}
      </StyledButton>
      <ListContainer isOpen={isOpen}>
        <List>
          {children}
        </List>
      </ListContainer>
    </Container>
  );
}

DropDown.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onBlur: PropTypes.func,
};

export default DropDown;
