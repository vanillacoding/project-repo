import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputWithLabelStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};

  .inputLabel {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-left: 0.5em;
    margin-bottom: 0.5em;
    color: #ffffff;
    font-weight: bold;
  }

  .textInput {
    width: 97%;
    height: 35px;
    border: none;
    border-radius: 5px;
    outline: none;
  }
`;

function InputWithLabel({
  width = "100%",
  height = "100%",
  labelContent,
  placeholder,
  onChange,
  value,
  type
}) {
  return (
    <InputWithLabelStyle width={width} height={height}>
      <label className="inputLabel">{labelContent}</label>
      <input
        type={type}
        className="textInput"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </InputWithLabelStyle>
  );
}

InputWithLabel.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  labelContent: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default React.memo(InputWithLabel);
