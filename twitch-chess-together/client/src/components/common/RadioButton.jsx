import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { flexCenter } from '../styles/mixin';

export default function RadioButton({
  htmlFor,
  text,
  value,
  state,
  setState,
  disabled,
}) {
  const handleChange = (event) => {
    const { id, value: _value } = event.target;
    setState((_state) => {
      const newState = { ..._state };
      newState[id] = parseInt(_value, 10);

      return newState;
    });
  };

  return (
    <RadioButtonInnerBox>
      <RadioButtonLabel htmlFor={htmlFor} />
      <RadioButtonInput
        type="radio"
        value={value}
        id={htmlFor}
        onChange={handleChange}
        checked={state[htmlFor] === value}
        disabled={disabled}
      />
      <RadioButtonText>{text}</RadioButtonText>
    </RadioButtonInnerBox>
  );
}

const RadioButtonText = styled.div`
  font-size: 40px;
`;

const RadioButtonInput = styled.input`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 40px 20px;
`;

const RadioButtonLabel = styled.label`
  width: auto;
  height: auto;
`;

const RadioButtonInnerBox = styled.div`
  ${flexCenter}
  width: 150px;
  height: 50px;
`;

RadioButton.defaultProps = {
  value: 0,
  disabled: false,
};

RadioButton.propTypes = {
  state: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  ).isRequired,
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  setState: PropTypes.func.isRequired,
};
