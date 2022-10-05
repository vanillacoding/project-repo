import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import Answer from "./Answer";
import Question from "./Question";

const Content = styled.div`
  width: 900px;
  height: 700px;
  padding: ${({ theme }) => theme.padding.base};
  display: grid;
  grid-template-columns: auto 350px;
  grid-template-rows: 200px 250px auto;
  position: relative;
  background: #ffffff;
`;

function StylePuzzle({ puzzle }) {
  return (
    <Content>
      <Question
        title={puzzle.title}
        content={puzzle.content}
        hint={puzzle.hint}
      />
      <Answer
        name={puzzle.name}
        style={puzzle.style}
        cssBefore={puzzle.cssBefore}
        cssAfter={puzzle.cssAfter}
        markup={puzzle.markup}
        output={puzzle.output}
        puzzleAnswer={puzzle.answer}
      />
    </Content>
  );
}

StylePuzzle.propTypes = {
  puzzle: PropTypes.object.isRequired
};

export default StylePuzzle;
