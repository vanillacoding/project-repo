import styled, { css } from "styled-components";

import ButtonContainer from "@/components/element/ButtonContainer";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 1em;
  margin: 0 auto;
  background-color: blue;
`;

const ModalContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding-top: 1em;
  margin: 0 auto;
`;

const color = css`
  ${({ result }) => {
    if (result === "false") {
      return css`
        background-color: ${(props) => props.theme.red.color};
      `;
    }

    return css`
      background-color: ${(props) => props.theme.primary.color};
    `;
  }}
`;

const Toggle = styled.span`
  width: 25vw;
  padding: 0.5em 1em;
  border-radius: 2vw;
  font-size: 0.8em;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.white.color};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);

  & + & {
    margin: 1em;
  }

  ${color}
`;

const Answer = styled.dt`
  height: 100%;
  padding: 0.5rem;
  margin-bottom: 1em;
  font-size: 1.2em;
`;

const Description = styled.dd`
  all: unset;
  font-size: 0.8em;
  line-height: 2em;
  margin-bottom: 2em;
  font-family: ${(props) => props.theme.fontKor};
`;

export {
  Container,
  ModalContainer,
  Toggle,
  Answer,
  Description,
  ButtonContainer,
};
