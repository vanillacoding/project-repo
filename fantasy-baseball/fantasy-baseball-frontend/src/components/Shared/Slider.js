import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;

const SliderInput = styled.input`
  width: 100%;
`;

const ValueMark = styled.div`
  padding: 0.5rem 0;
`;

const ValueList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  padding: 0.5rem 0.5rem 0 0;
`;

function SharedSlider(props) {
  const {
    minValue,
    maxValue,
    value,
    step,
    handleChange,
  } = props;

  return (
    <Wrapper>
      <ValueMark>
        <Label>베팅금액</Label>
        {value}
      </ValueMark>
      <SliderInput
        type="range"
        min={minValue}
        max={maxValue}
        value={value}
        step={step}
        onChange={handleChange}
      />
      <ValueList>
        <Label>
          {minValue}
        </Label>
        <Label>
          {maxValue}
        </Label>
      </ValueList>
    </Wrapper>
  );
}

SharedSlider.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SharedSlider;
