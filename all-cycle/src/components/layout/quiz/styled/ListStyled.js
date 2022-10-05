import styled from "styled-components";

import NextLink from "@/components/element/NextLink";
import ToggleButton from "@/components/element/ToggleButton";

const QuizContainer = styled.ul`
  width: 100%;
  margin-top: 3.5em;
  padding: 0.5em;
  gap: 0.3em;
  font-size: 1em;
  background-color: ${(props) => props.theme.badgeBg.color};
`;

const QuizBox = styled.li`
  margin-bottom: 1em;
  padding: 0.3em;
`;

const Category = styled(ToggleButton)`
  margin: auto;
  font-size: 0.5em;
  color: ${(props) => props.theme.primary.color};
  background-color: ${(props) => props.theme.lightGray.color};
`;

const Question = styled(ToggleButton)`
  margin: auto;
  margin-top: 0.5em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.8em;
  text-align: start;
  color: ${(props) => props.theme.lightFont.color};
  font-size: 0.8em;
  font-family: ${(props) => props.theme.fontEng};
  background-color: ${(props) => props.theme.white.color};
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
`;

export {
  QuizContainer,
  QuizBox,
  Category,
  Question,
  NextLink,
};
