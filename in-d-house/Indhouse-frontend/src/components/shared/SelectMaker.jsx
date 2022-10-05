import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 5rem;
  label {
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
`;

const Select = styled.select`
  width: 8rem;
  height: 3rem;
  margin: 0.5rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.indigo};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.weak};
  text-align: center;

  label {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const SelectMaker = ({ name, options, setValue }) => {
  return (
    <Wrapper>
      <label>{`Select ${name}`}</label>
      <Select onChange={({ target }) => setValue(target.value)} defaultValue="" >
        <option value="" disabled hidden >{`--select--`}</option>
        {options.map(option => {
          return (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          );
        })}
      </Select>
    </Wrapper>
  );
};

SelectMaker.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  setValue: PropTypes.func,
};

export default SelectMaker;
