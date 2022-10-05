import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Checkbox = ({ id, label, name, onChange, checked }) => {
  return (
    <Wrapper>
      <label htmlFor={id}>{label}</label>
      <input type="checkbox"
        id={id}
        name={name}
        onChange={onChange}
        checked={checked}
      />
    </Wrapper>
  );
};

const Wrapper = styled.li`
  min-width: 60px;
  text-align: center;

  label {
    overflow: hidden;
    display: block;
    min-height: 22px;
    font-size: 14px;
    line-height: 1;
    box-sizing: border-box;
  }

  input {
    position: relative;
    width: 22px;
    height: 22px;
    margin-top: 16px;
    border-radius: 3px;
    background: #dcdcdd;
    -webkit-appearance: none;
  }

  input:checked {
    border-color: #665196 !important;
    background: #fff;
  }

  input[type=checkbox]:checked {
    background: #057bff;
  }

  input:before {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    border-color: #fff;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  input[type=checkbox]:before {
    width: 11px;
    height: 4px;
    margin: -5px 0 0 -7px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  input[type=checkbox]:checked:before {
    content: "";
    border: solid #fff;
    border-width: 0 0 2px 2px;
  }
`;

Checkbox.propTypes = {
  checked: PropTypes.func,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
