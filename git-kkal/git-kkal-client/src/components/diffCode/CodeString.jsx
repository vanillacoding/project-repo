import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getCodeType } from '../../utils/diff';

export default function CodeString({ codeChunk }) {
  const codeType = getCodeType(codeChunk);

  return (
    <Wrapper codeType={codeType}>
      <Sign>{codeType.sign}</Sign>
      <CodeText>{codeType.code}</CodeText>
    </Wrapper>
  );
}

const Sign = styled.div`
  width: 15px;
  margin: 3px 5px;
`;

const CodeText = styled.div`
  height: auto;
  margin: 3px 5px;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme, codeType }) => {
    if (codeType.sign === '+') {
      return theme.background.transparentGreen;
    }

    if (codeType.sign === '-') {
      return theme.background.transparentRed;
    }

    return '';
  }};
`;

CodeString.defaultProps = {
  codeChunk: '',
};

CodeString.propTypes = {
  codeChunk: PropTypes.string,
};
