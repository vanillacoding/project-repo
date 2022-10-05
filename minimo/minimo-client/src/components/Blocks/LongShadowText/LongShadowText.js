import PropTypes from 'prop-types';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import styled from 'styled-components';

const COLOR_MINT = '#01ded3';
const SHADOW_DISTANCE = 200;

function getTextShadow(distance = SHADOW_DISTANCE, color = COLOR_MINT) {
  let textShadow = '';

  for (let i = 0; i < distance; i++) {
    textShadow += `${(textShadow ? ',' : '') + i}px ${i}px 0 ${color}`;
  }

  return textShadow;
}

export default function LongShadowText({
  data,
  index,
  isEditable = true,
  onChange,
}) {
  const { texts } = data.contents;
  const { styles } = data;

  return (
    <Container
      textShadow={getTextShadow()}
    >
      <ContentEditable
        html={texts}
        style={{ ...styles }}
        // TODO: constant
        onChange={(e) => onChange(e, index, 'texts')}
        disabled={!isEditable}
      />
    </Container>
  );
}

LongShadowText.propTypes = {
  data: PropTypes.shape({
    contents: PropTypes.shape({
      texts: PropTypes.string,
    }),
    styles: PropTypes.object,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isEditable: PropTypes.bool,
  onChange: PropTypes.func,
};

const Container = styled.div`
  font-size: 3rem;
  font-weight: 900;
  background: #169af7;
  text-transform: uppercase;
  text-shadow: ${({ textShadow }) => textShadow};
  overflow: hidden;

  & div {
    padding : 1.5rem;
    text-align: center;
  }
`;
