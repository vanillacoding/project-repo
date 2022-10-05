import React from "react";
import styled from "styled-components";

const UserNameForm = ({ onSubmit, value, onChange, name = "" }) => {
  return (
    <Form onSubmit={onSubmit}>
      <TextInput 
        type="text" 
        placeholder="Please enter your name"
        value={value}
        name={name}
        onChange={onChange}
      />
      <SubmitButton type="submit" value="go" />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  width: 40%;
  flex-direction: column;
`;

const TextInput = styled.input`
  height: 30px;
  margin-bottom: 5%;
  text-align: center;
  border: 0;
`;

const SubmitButton = styled.input`
  height: 30px;
  margin-bottom: 5%;
  text-align: center;
  border: 0;
  color: white;
  background: #e55643;
  box-shadow: 0 6px 0 #AB3C2D, 0 5px 10px rgba(0, 0, 0, 0.35);
  text-shadow: 0 -2px 2px rgba(175, 49, 95, 0.9);
  border-radius: 5px;

  :hover {
    background-color: #F16A58;
    text-shadow: 0 -1px 1px rgba(175, 49, 95, 0.9), 0 0 5px rgba(255, 255, 255, 0.8);
  }

  :active, 
  :focus {
    box-shadow: 0 8px 0 #AB3C2D, 0 12px 10px rgba(0, 0, 0, 0.3);
  }
`;

export default UserNameForm;
