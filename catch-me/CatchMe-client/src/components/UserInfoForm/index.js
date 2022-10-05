import React from "react";
import styled from "styled-components";

import RadioInput from "../RadioInput";

const UserInfoForm = ({ 
  isReady, 
  username, 
  role, 
  onChange, 
  onClick, 
  onSubmit 
}) => {
  return (
    <EditStateField onSubmit={onSubmit}>
      <TextInput 
        type="text" 
        name="username" 
        value={username} 
        onChange={onChange} 
        disabled={isReady} 
      />
      <RadioField name="role" onChange={onChange}>
        <RadioInput 
          name="role" 
          value="rabbit" 
          isDisabled={isReady} 
          isDefaultChecked={role === "rabbit" ? true : false} 
        />
        <RadioInput 
          name="role" 
          value="carrot" 
          isDisabled={isReady}
          isDefaultChecked={role === "rabbit" ? false : true} 
        />
      </RadioField>
      <Button type="submit" value={isReady ? "Edit" : "Ready"} onClick={onClick} />
    </EditStateField>
  );
};

const EditStateField = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 41%;
  background: #F3ECE4;
  border-radius: 5px;
  border: 1.5px solid #D6CBBF;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;

const RadioField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

const TextInput = styled.input`
  width: 80%;
  height: 12%;
  margin-top: 20px;
  border: 0;
  text-align: center;
`;

const Button = styled.input`
  width: 50%;
  height: 25%;
  margin-top: 20px;
  background: #D4C8BB;
  border: 0;
  border-radius: 5px;
  font-size: 20px;
  color: #817568;
  box-shadow: 0 6px 0 #B9AB9B, 0 5px 10px rgba(0, 0, 0, 0.35);
  text-shadow: 0 -2px 2px #D9CBBA;
  cursor: pointer;

  :hover {
    background-color: #DDCEBF;
    text-shadow: 0 -1px 1px #D9CBBA, 0 0 5px rgba(255, 255, 255, 0.8);
  }

  :active, 
  :focus {
    box-shadow: 0 8px 0 #B9AB9B, 0 12px 10px rgba(0, 0, 0, 0.3);
  }
`;

export default UserInfoForm;
