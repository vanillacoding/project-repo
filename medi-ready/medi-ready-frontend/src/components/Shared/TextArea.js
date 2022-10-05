import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextArea = ({ name, children, value, onChange, placeholder, readOnly }) => {
  return (
    <Wrapper
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      placeholder={placeholder}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.textarea`
  min-height: 100px;
  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: 8px;
  background-color: #EFF0F6;
  overflow: auto;
  outline: none;
  box-shadow: none;
  resize: none;
`;

TextArea.propTypes = {
  value: PropTypes.string,
  readOnly: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextArea;
