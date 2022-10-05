import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CodeBox from './CodeBox';

export default function DiffParagraphCode({ paragraph }) {
  return (
    <Wrapper>
      <CodeBox code={paragraph.before} />
      <CodeBox code={paragraph.after} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0 30px 0;
  box-sizing: border-box;
  border-top: 1px solid white;
`;

DiffParagraphCode.propTypes = {
  paragraph: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.arrayOf(PropTypes.string),
        ]),
      ),
    ]),
  ).isRequired,
};
