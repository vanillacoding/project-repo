import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import getDefaultParagraph from './defaultData';
import isEmptyObject from '../../../utils/isEmptyObject';
import useColorPicker from '../../../hooks/useColorPicker';
import { TextColorPicker } from '../../shared/ColorPicker';

export default function Paragragh({
  data,
  index,
  isEditable = true,
  isActive,
  onChange,
  handleChangeStyle,
}) {
  // NOTE: 필요한가? editor에서 주기는 한다.
  const {
    color,
    isColorPickerOpen,
    toggleColorPicker,
    handleChangeColor,
  } = useColorPicker();

  function onChangeColor(newColor) {
    handleChangeColor(newColor);
    handleChangeStyle(newColor.hex, index, 'color');
  }

  const titleData = isEmptyObject(data) ? getDefaultParagraph() : data;
  const { texts } = titleData.contents;
  const { styles } = titleData;

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
          isColorPickerOpen={isColorPickerOpen}
          onChange={onChangeColor}
          toggleColorPicker={toggleColorPicker}
        />
      )}
    </Container>
  );
}

Paragragh.propTypes = {
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

const Container = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  font-size: 1rem;
`;
