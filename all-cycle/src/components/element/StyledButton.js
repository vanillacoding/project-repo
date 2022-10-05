import styled from "styled-components";

const StyledButton = styled.button`
  all: unset;
  border: 1px solid ${(props) => props.theme.primary.color};
  padding: 0.5em 2em;
  color: ${(props) => props.theme.primary.color};
  border-radius: 10px;
  z-index: 10;

  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${(props) => props.theme.primary.color};
    color: ${(props) => props.theme.white.color};
  }
`;

export default StyledButton;
