import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Icon = styled.svg`
  fill: none;
  stroke: ${({ theme }) => theme.background.sub};
  stroke-width: 3px;
`;

const CheckBoxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const StyledCheckBox = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.background.sub};
  border-radius: 10px;

  ${Icon} {
    visibility: ${(props) => props.checked ? "visible" : "hidden"};
  }
`;

const HiddenCheckBox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

function CheckBoxComponent({ className, checked }) {
  return (
    <>
      <CheckBoxContainer className={className}>
        <HiddenCheckBox type="checkbox" checked={checked} />
        <StyledCheckBox checked={checked}>
          <Icon viewBox="0 0 24 24">
            <polyline points="19 7 10 17 5 12" />
          </Icon>
        </StyledCheckBox>
      </CheckBoxContainer>
    </>
  );
}

CheckBoxComponent.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
};

export default CheckBoxComponent;
