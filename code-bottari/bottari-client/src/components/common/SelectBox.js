import { useState } from "react";
import styled from "styled-components";

import { SORT } from "../../constants/variants";

const Select = styled.select`
  appearance: none;
  width: 140px;
  height: 40px;
  padding: 5px 30px 5px 10px;
  border: none;
  border-radius: 4px;
  outline: 0 none;
  background: black url("images/grey_arrow.png") calc(100% - 5px) center no-repeat;
  color: var(--color-gray);
  font-size: 20px;
  font-family: Inter;
  font-weight: bold;
`;

const SelectOption = styled.option`
  padding: 3px 0;
  background: black;
`;

export default function EditorSelectBox({ type, options }) {
  const [selected, setSelected] = useState("default");

  const handleChangeSelect = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Select variant={SORT} className="select" onChange={handleChangeSelect} value={selected}>
      <SelectOption value="default" disabled>{type}</SelectOption>
      {options.map((theme) => (
        <SelectOption value={theme}>
          {theme}
        </SelectOption>
      ))}
    </Select>
  );
}
