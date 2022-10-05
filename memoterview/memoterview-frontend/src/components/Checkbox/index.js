import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: ${(props) => (props.width ? props.width : "16px")};
  height: ${(props) => (props.height ? props.height : "16px")};
  background: ${(props) => (props.checked ? props.theme.ButtonGreen : props.theme.BabyPowder)};
  border: ${({ theme }) => `1px solid ${theme.Whisper}`};
  border-radius: 4px;
  transition: all 200ms;
  cursor: pointer;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const Checkbox = ({ className, checked, width, height, onChange, ...props }) => (
  <CheckboxContainer className={className}>
    <StyledCheckbox checked={checked} width={width} height={height} onClick={onChange}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
