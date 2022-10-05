import styled, { css, keyframes } from "styled-components";

export const FlexDirectionColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const boxShadow = css`
  box-shadow: 0px 5px 2px 0px rgb(0 0 0 / 20%), 2px 4px 4px 3px rgb(0 0 0 / 14%),
    2px 3px 7px 2px rgb(0 0 0 / 12%);
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
}
`;

export const slideUp = keyframes`
  from {
    transform: translateY(30px);
  }

  to {
    transform: translateY(0px);
  }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(30px);
  }
`;
