import PropTypes from 'prop-types';
import React from 'react';
import * as ICON from 'react-feather';
import styled from 'styled-components';
import { CirclePicker } from 'react-color';

export default function TextColorPicker({
  color,
  onChange,
  isColorPickerOpen,
  toggleColorPicker,
}) {
  return (
    <>
      <ColorPickerContainer>
        {isColorPickerOpen && (
          <CirclePicker
            onChange={onChange}
            color={color}
          />
        )}
      </ColorPickerContainer>
      <IconWrapper
        onClick={toggleColorPicker}
      >
        <ICON.PenTool color='grey' size={20} />
      </IconWrapper>
    </>
  );
}

TextColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  isColorPickerOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleColorPicker: PropTypes.func.isRequired,
};

const ColorPickerContainer = styled.div`
  position: absolute;
  right: -350px;
  top: -20px;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: -20px;
  cursor: pointer;
`;
