import React from "react";

const RadioInput = ({ name, value, isDisabled, isDefaultChecked }) => {
  return (
    <>
      <input 
        type="radio" 
        name={name}
        value={value} 
        disabled={isDisabled} 
        defaultChecked={isDefaultChecked}
      />
      <label>{value}</label>
    </>
  );
};

export default RadioInput;
