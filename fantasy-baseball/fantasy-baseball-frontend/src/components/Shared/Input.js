import React from "react";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputBox = styled.div`
  width: 100%;
  margin: 0 0 1rem 0;
  padding: ${({ theme }) => theme.padding.small};
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Input = styled.input`
  width: calc(100% - 25px);
  background: transparent;
  border: transparent;
  font-size: ${({ theme }) => theme.fontSize.base};

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.color.white};
    border-radius: none;
    outline: none;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

function SharedInput(props) {
  const {
    type,
    name,
    value,
    placeholder,
    handleChange,
  } = props;

  return (
    <InputBox>
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <FontAwesomeIcon
        icon={faSearch}
        size="lg"
        color="white"
      />
    </InputBox>
  );
}

SharedInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SharedInput;
