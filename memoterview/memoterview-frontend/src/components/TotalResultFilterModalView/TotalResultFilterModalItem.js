import React, { useState } from "react";
import styled from "styled-components";

import Checkbox from "../Checkbox";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  margin-left: 10px;
  font-size: 1em;
  cursor: pointer;
`;

export default function TotalResultFilterModalCheckBox({ label, defaultChecked, onCheckedChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  function onChange() {
    setChecked(!checked);

    onCheckedChange(!checked, label);
  }

  return (
    <Wrapper>
      <Checkbox checked={checked} onChange={onChange} width="1.5rem" height="1.5rem"/>
      <Label onClick={onChange}>{label}</Label>
    </Wrapper>
  );
}
