import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 250px;

  svg {
    cursor: pointer;
    transition: transform 0.3s linear;

    &:hover {
      opacity: 0.7;
      transform: rotate(180deg);
    }
  }
`;
