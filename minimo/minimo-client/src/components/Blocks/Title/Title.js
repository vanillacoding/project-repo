import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import useColorPicker from '../../../hooks/useColorPicker';
import { TextColorPicker } from '../../shared/ColorPicker';

const Container = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  color: black;
  font-weight: bolder;
  font-size: 2.5rem;
`;

export default function Title({
  data,
  index,
  isActive = false,
  isEditable = false,
  onChange,
  handleChangeStyle,
}) {
  const {
    color,
    isColorPickerOpen,
    toggleColorPicker,
    handleChangeColor,
  } = useColorPicker();

  const { texts } = data.contents;
  const { styles } = data;

  function onChangeColor(newColor) {
    handleChangeColor(newColor);
    handleChangeStyle(newColor.hex, index, 'color');
  }

  return (
    <Container>
      <ContentEditable
        html={texts}
        style={{ ...styles }}
        onChange={(e) => onChange(e, index, 'texts')}
        disabled={!isEditable}
      />
      {isActive && (
        <TextColorPicker
          color={color}
          onChange={onChangeColor}
          toggleColorPicker={toggleColorPicker}
          isColorPickerOpen={isColorPickerOpen}
        />
      )}
    </Container>
  );
}

Title.propTypes = {
  data: PropTypes.shape({
    contents: PropTypes.shape({
      texts: PropTypes.string,
    }),
    styles: PropTypes.object,
  }).isRequired,
  handleChangeStyle: PropTypes.func,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  isEditable: PropTypes.bool,
  onChange: PropTypes.func,
};
