import styled from "styled-components";

import AnswerModal from "@/components/layout/quizModal/AnswerModal";
import ToggleButton from "@/components/element/ToggleButton";
import StyledModal from "@/components/element/StyledModal";

const Container = styled.section`
  width: 500px;
  margin-top: 1.5em;
  padding: 1em;
`;

const Question = styled.div`
  margin: 0.5em;
  margin-top: 1em;
  padding: 1em;
  font-size: 1.1em;
  border-radius: 2vw;
  background-color: ${(props) => props.theme.lightGray.color};
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
`;

const Category = styled(ToggleButton)`
  border: none;
  color: ${(props) => props.theme.white.color};
  background-color: ${(props) => props.theme.lightFont.color};
`;

export {
  Container,
  Question,
  Category,
  AnswerModal,
  StyledModal,
};
