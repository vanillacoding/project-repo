import React, { useState, useRef, useEffect } from "react";

import parse from "html-react-parser";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { changePlayerAnswer } from "../../../actions/game";
import Numbers from "./Numbers";

const Style = styled.div`
  height: 250px;
  position: relative;
  border: 1px solid #dddddd;
  font-family: "Anonymous Pro";
  font-size: 16px;
  line-height: 16px;
  overflow-y: auto;
`;

const Alert = styled.div`
  width: 100%;
  padding: 0.3rem 0.5rem;
  position: absolute;
  top: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  font-size: 0.6rem;
`;

const StyleTextarea = styled.textarea`
  width: calc(100% - 43px - 0.5rem);
  height: 88px;
  margin: 0 0 0 43px;
  padding: 5px;
  display: block;
  font-family: "Anonymous Pro";
  line-height: 18px;
  resize: none;

  &::placeholder {
    color: #bbbbbb;
  }

  &:focus {
    background: rgba(247, 223, 2, 0.3);
    outline: none;
  }
`;

const Markup = styled.div`
  position: relative;
  background: #f0f0f0;
  font-family: "Anonymous Pro";
  font-size: 16px;
`;

const Pre = styled.pre`
  margin: 0 0 0 25px;
  line-height: 22px;
`;

const Label = styled.span`
  width: 50px;
  padding: 0.1rem 0.2rem;
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ color }) => color};
  color: #ffffff;
  text-align: center;
`;

const Output = styled.div`
  ${props => props.ouputStyle};
  grid-column: 2 / 3;
  grid-row: 1 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fcf9e9;

  > * {
    user-select: none;
  }
`;

function Answer(props) {
  const {
    name,
    style,
    cssBefore,
    cssAfter,
    markup,
    output,
    puzzleAnswer
  } = props;

  const [styleLines, setStyleLines] = useState(0);
  const [markupLines, setMarkupLines] = useState(0);
  const [alert, setAlert] = useState(null);
  const playerAnswer = useSelector(state => state.game.playerAnswer[name].answer);
  const dispatch = useDispatch();
  const outputRef = useRef();
  const styleRef = useRef();
  const markupRef = useRef();

  const handleAnswer = (event) => {
    const { value } = event.target;
    dispatch(changePlayerAnswer(name, value));
    checkAnswer(value);
  };

  const hasPropertyInAnswer = (answer, property, value = null) => {
    if (value && answer.includes(property) && answer.includes(value)) {
      if (puzzleAnswer.includes(property) === false) {
        return true;
      }
    }

    if (!value && answer.includes(property) && puzzleAnswer.includes(property) === false) {
      return true;
    }

    return false;
  };

  const checkAnswer = (answer) => {
    if (hasPropertyInAnswer(answer, "position")) {
      setAlert("혹시 Element를 강제로 옮기려고 하는 거야? 다른 방법을 생각해보자. 잘 모르겠으면 HINT 버튼을 눌러봐!");
      return;
    }

    if (hasPropertyInAnswer(answer, "margin")) {
      setAlert("margin을 사용하지 않는 방법이 분명히 있을텐데...");
      return;
    }

    if (hasPropertyInAnswer(answer, "display", "none")) {
      setAlert("설마 Element를 강제로 없애려는 건 아니지? 다른 방법을 찾아보자.");
      return;
    }

    if (hasPropertyInAnswer(answer, "transform", "scale")) {
      setAlert("사이즈를 줄이는 것 말고 다른 방법을 찾아보자.");
      return;
    }

    if (hasPropertyInAnswer(answer, "!important")) {
      setAlert("important로 오버라이딩을 하다니.. HINT를 눌러서 다른 방법을 확인해보자.");
      return;
    }

    setAlert(null);
  };

  const stopDragImage = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const removeStyles = (node) => {
      node.removeAttribute("style");

      if (node.hasChildNodes) {
        for (let i = 0; i < node.children.length; i++) {
          removeStyles(node.children[i]);
        }
      }
    };

    removeStyles(outputRef.current);
    const selectedElements = outputRef.current.querySelectorAll(".selected");

    for (let i =0; i < selectedElements.length; i++) {
      selectedElements[i].style = playerAnswer;
    }

    const images = outputRef.current.querySelectorAll("img");

    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("dragstart", stopDragImage);
    }

    setStyleLines(Math.round(styleRef.current.scrollHeight / 22));
    setMarkupLines(Math.round(markupRef.current.scrollHeight / 22));
  }, [playerAnswer]);

  return (
    <>
      <Style ref={styleRef}>
        {alert && <Alert>{alert}</Alert>}
        <Label color="red">CSS</Label>
        <Numbers line={styleLines} />
        <Pre>{cssBefore}</Pre>
        <label
          htmlFor="styleAnswer"
          className="sr-only"
        >
          정답
        </label>
        <StyleTextarea
          id="styleAnswer"
          placeholder="/* Type style */"
          onChange={handleAnswer}
          value={playerAnswer}
        />
        <Pre>{cssAfter}</Pre>
      </Style>
      <Markup ref={markupRef}>
        <Label color="orange">HTML</Label>
        <Numbers line={markupLines} />
        <Pre>{markup}</Pre>
      </Markup>
      <Output ref={outputRef} ouputStyle={style}>
        {parse(output)}
      </Output>
    </>
  );
}

Answer.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  cssBefore: PropTypes.string.isRequired,
  cssAfter: PropTypes.string.isRequired,
  markup: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
  puzzleAnswer: PropTypes.string.isRequired
};

export default Answer;
