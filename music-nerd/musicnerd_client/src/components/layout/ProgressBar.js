import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../lib/colors';

const ProgressBar = ({
  lengthLimit,
  currentLength
}) => (
  <Bar>
    <Progress style={{ width: `${currentLength / lengthLimit * 100}%` }} />
  </Bar>
);

const Bar = styled.div`
  border: 1px solid ${colors.MAIN_TEXT_COLOR};
  border-radius: 2rem;
  width: 45rem;
  height: 1rem;
  margin: 1rem auto 3rem auto;
`;

const Progress = styled.div`
  height: 100%;
  border-radius: 2rem;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

ProgressBar.propTypes = {
  lengthLimit: PropTypes.number.isRequired,
  currentLength: PropTypes.number.isRequired
};

export default ProgressBar;
