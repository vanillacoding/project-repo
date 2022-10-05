import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CodeString from './CodeString';
import { getNumberLength } from '../../utils/diff';

export default function CodeBox({ code }) {
  const { line: lineNumber, logList: codeLineList } = code;

  return (
    <CodeLineList>
      {codeLineList.map((codeLine, index) => (
        <CodeLine key={index}>
          <CodeLineNumber
            key={`CodeLineNumber-${index}`}
            lineNumberLength={getNumberLength(lineNumber + index)}
          >
            {lineNumber + index}
          </CodeLineNumber>
          <CodeString key={`Log-${index}`} codeChunk={codeLine} />
        </CodeLine>
      ))}
    </CodeLineList>
  );
}

const CodeLineList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
  font-family: 'Fira Code', monospace;
  list-style: none;
  margin: 0;
`;

const CodeLine = styled.li`
  display: flex;
`;

const CodeLineNumber = styled.pre`
  width: ${({ lineNumberLength }) => (lineNumberLength > 3 ? 'auto' : '30px')};
  box-sizing: border-box;
  margin: 8px 10px;
  color: ${({ theme: { font } }) => font.color.grey};
  white-space: pre-wrap;
`;

CodeBox.propTypes = {
  code: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  ).isRequired,
};
