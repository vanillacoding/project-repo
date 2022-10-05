import styled, { css } from "styled-components";

const ScoreFigure = styled.figure`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 1em;

  & + & {
    margin-top: 0.5em;
  }
`;

const Title = styled.dt`
  all: unset;
  font-size: 0.5em;
`;

const Number = styled.span`
  color: ${(props) => props.theme.gray.color};
`;

const Container = styled.dd`
  width: ${(props) => `${props.width}vw`};
  height: ${(props) => `${props.height}vh`};
  border-radius: 3vw;
  background-color: ${(props) => props.theme.lightGray.color};
  box-shadow: inset 0px 0px 11px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

const Width = css`
  ${(props) => css`
    width: ${props.size}%;
  `}
`;

const Bar = styled.div`
  height: 100%;
  max-width: 100px;
  border-radius: 3vw;
  background-color: ${(props) => props.theme.primary.color};
  box-shadow: inset 0px 0px 11px rgba(0, 0, 0, 0.15);

  ${Width}
`;

export {
  ScoreFigure,
  Title,
  Number,
  Container,
  Bar,
};
