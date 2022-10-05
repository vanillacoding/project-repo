import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useEmojiEffect from '../hooks/useEmojiEffect';

function Canvas({ emoji }) {
  const canvasRef = useRef(null);

  useEmojiEffect(canvasRef, emoji);

  return (<FilterCanvas ref={canvasRef} />);
}

const FilterCanvas = styled.canvas`
  position: absolute;
  top: 0;
  z-index: 15;
  border-radius: 160px;
`;

export default Canvas;

Canvas.propTypes = {
  emoji: PropTypes.string,
};
