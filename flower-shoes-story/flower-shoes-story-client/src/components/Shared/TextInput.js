import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextInput = ({ label, name, placeholder, value, readOnly, className, onChange, required }) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input type="text"
        id={name}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        required={required}
      />
    </>
  );
};

const Label = styled.label`
  display: inline-block;
  height: 45px;
  border-bottom: 1px solid #222;
  line-height: 45px;
  font-size: 14px;
  vertical-align: top;
`;

const Input = styled.input`
  display: inline-block;
  width: ${(props) => props.width};
  height: 45px;
  padding: 0 10px;
  border-bottom: 1px solid #222;
  background-color: #e7e7e7;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 45px;
  vertical-align: top;
`;

TextInput.propTypes = {
  width: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default TextInput;
