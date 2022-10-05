import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ColorSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 25px;
  height: 25px;
  padding: 5px;
  margin: 0 auto;
  border: 5px solid ${({ theme }) => theme.background.sub};
  border-radius: 3px;
`;

const Label = styled.label`
  display: inline-block;
  width: 100%;
  border-radius: 2px;
`;

const RadioButton = styled.input`
  display: none;

  &:checked + ${Label} {
    background: ${({ theme }) => theme.background.sub};
  }
`;

const INPUT_NAME = "customType";

function Radio({
  id,
  value,
  checked,
  onChange,
}) {
  return (
    <ColorSelectorContainer onClick={() => onChange(value)}>
      <RadioButton
        id={id}
        type="radio"
        value={value}
        name={INPUT_NAME}
        checked={checked}
        onChange={onChange}
      />
      <Label
        htmlFor={value}
      />
    </ColorSelectorContainer>
  );
}

Radio.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default Radio;
