import React from "react";
import styled from "styled-components";

export default function FormField({
  title,
  type,
  controller: { value, onChange },
  placeholder,
  required = true,
  onKeyPress,
}) {
  return (
    <Wrapper>
      {title && <legend>{title}</legend>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        required={required}
      />
    </Wrapper>
  );
}

export const Wrapper = styled.fieldset`
  font-size: 16px;
  margin-bottom: 21px;
  &:last-of-type {
    margin-bottom: 0;
  }
  & legend {
    margin-bottom: 10px;
  }
  & input {
    width: 100%;
    padding: 0 5px;
    height: 40px;
    padding: 0 10px;
  }
`;
