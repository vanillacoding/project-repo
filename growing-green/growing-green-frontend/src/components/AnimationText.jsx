import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

export default function AnimationText({ children: text }) {
  const textList = text.split('');

  return (
    <TextContainer text={textList}>
      {textList.map((word, index) => (
        <span key={`${word} ${index}`}>{word}</span>
      ))}
    </TextContainer>
  );
}

AnimationText.propTypes = {
  children: PropTypes.string.isRequired,
};

function delayChildernAnimation(text) {
  return text.map((_, index) => {
    const interval = 0.1;
    const childNumber = index + 1;
    const delayTime = interval * childNumber;

    return `span:nth-child(${childNumber}) { animation-delay: ${delayTime}s;}`;
  });
}

const bounce = keyframes`{
  100% {
    top: -10px;
  }
  30% {
    top: -10px;
  }
}`;

const TextContainer = styled.h3`
  font-size: 1.1em;
  font-weight: 500;

  span {
    position: relative;
    top: -15px;
    animation: 1s ease infinite alternate both ${bounce};
  }

  ${({ text }) => delayChildernAnimation(text)}
`;
