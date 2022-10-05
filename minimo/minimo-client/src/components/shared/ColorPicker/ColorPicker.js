import PropTypes from 'prop-types';
import React from 'react';
import * as ICON from 'react-feather';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

export default function ColorPicker({
  color,
  onChange,
  toggleColorPicker,
  isColorPickerOpen,
}) {
  return (
    <ColorPickerContainer>
      {isColorPickerOpen && (
        <StyledChromePicker
          onChange={onChange}
          color={color}
        />
      )}
      <ColorPickerIcon
        onClick={toggleColorPicker}
      >
        <ICON.Aperture fill='white' />
      </ColorPickerIcon>
    </ColorPickerContainer>
  );
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  isColorPickerOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleColorPicker: PropTypes.func.isRequired,
};

const ColorPickerIcon = styled.div`
  position: absolute;
  top: -30px;
  right: 0px;
  cursor: pointer;
`;

const StyledChromePicker = styled(ChromePicker)`
  position: absolute;
`;

const ColorPickerContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
