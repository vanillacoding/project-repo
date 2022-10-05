import styled from "styled-components";

import ButtonContainer from "@/components/element/ButtonContainer";
import StyledButton from "@/components/element/StyledButton";
import ToggleButton from "@/components/element/ToggleButton";

const Container = styled.section`
  width: 100%;
  padding: 0.5em 1em;
`;

const AnswerButton = styled(ToggleButton)`
  border: none;
  font-size: 1em;
  color: ${(props) => props.theme.white.color};
  background-color: ${(props) => props.theme.lightFont.color};
`;

const Option = styled.li`
  & + & {
    margin-top: 0.3em;
  }
`;

const OptionButton = styled(StyledButton)`
  border: 1px solid ${(props) => props.theme.green.color};
  color: ${(props) => props.theme.white.color};
  background-color: ${(props) => props.theme.primary.color};
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
`;

const Caption = styled.figcaption`
  all: unset;
  position: fixed;
  padding: 0.3em 0.5em;
  font-size: 0.7em;
  font-weight: 600;
  text-align: start;
  border: 1px solid ${(props) => props.theme.green.color};
  border-bottom-right-radius: 0.5em;
  color: ${(props) => props.theme.green.color};
  background-color: ${(props) => props.theme.white.color};
  z-index: 1;

  &:hover {
    color: ${(props) => props.theme.primary.color};
    border: 1px solid ${(props) => props.theme.primary.color};
  }
`;

const ImageOptionList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 120px);
  grid-template-rows: repeat(auto, 110px);
  gap: 0.5em;
  justify-content: center;
`;

const ImageOption = styled.li`
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.green.color};
  padding: 0.4em;
  border-radius: 2vw;

  &:hover {
    background-color: ${(props) => props.theme.primary.color};
  }
`;

const Picture = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4vw;
`;

export {
  Container,
  AnswerButton,
  ButtonContainer,
  Option,
  Caption,
  OptionButton,
  ImageOptionList,
  ImageOption,
  Picture,
};
