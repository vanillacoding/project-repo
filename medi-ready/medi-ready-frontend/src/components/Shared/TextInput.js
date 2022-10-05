import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextInput = ({ label, width, name, placeholder, value, readOnly, className, onChange }) => {
  return (
    <label htmlFor={label}>
      <Input type="text"
        id={label}
        name={name}
        value={value}
        width={width}
        readOnly={readOnly}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </label>
  );
};

const Input = styled.input`
  display: inline-block;
  width: ${(props) => props.width};
  height: 45px;
  padding: 0 10px;
  background-color: #EFF0F6;
  border-radius: 8px;
  box-sizing: border-box;
  line-height: 45px;
`;

TextInput.propTypes = {
  width: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  width: "100%",
};

export default TextInput;
