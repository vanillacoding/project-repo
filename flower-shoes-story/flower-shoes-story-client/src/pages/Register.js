import React, { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { updateUser } from "../api";
import { save } from "../features/userSlice";

import Button from "../components/Shared/Button";
import PageTitle from "../components/Shared/PageTitle";

import Background from "../components/Shared/Background";
import TextInput from "../components/Shared/TextInput";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [partnerId, setPartnerId] = useState("");

  const { mutate } = useMutation(updateUser, {
    onSuccess: ({ result, data }) => {
      const { user } = data;

      if (result === "success") {
        dispatch(save(user));
        history.push("/queue");
      }
    },
  });

  const handleChange = (event) => {
    setPartnerId(event.target.value);
  };

  const currentDate = new Date().toISOString().substring(0, 10);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { type, date, discharge } = event.target;

    mutate({
      type: type.value,
      partnerId,
      date: date.value,
      discharge: discharge.value,
    });
  };

  return (
    <Wrapper>
      <PageTitle className="sr-only">Register</PageTitle>

      <form onSubmit={handleSubmit}>
        <div>
          <p>What's your role?</p>
          <input type="radio" id="soldier" name="type" value="soldier" checked />
          <label htmlFor="soldier">SOLDIER</label>
          <input type="radio" id="gomsin" name="type" value="gomsin" />
          <label htmlFor="gomsin">GOMSIN</label>
        </div>
        <div>
          <TextInput label="What's your partner email?" name={partnerId} value={partnerId} onChange={handleChange} required />
        </div>
        <div>
          <p>What's the first meeting day?</p>
          <input type="date" name="date" defaultValue={currentDate} max={currentDate} required />
        </div>
        <div>
          <p>Select discharged date.</p>
          <input type="date" name="discharge" defaultValue={currentDate} required />
        </div>
        <Button type="submit">submit</Button>
      </form>
      <Background />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  p {
    margin-bottom: 10px;
  }

  p ~ label {
    display: inline-block;
    font-family: "adrianna";
  }

  p ~ input {
    display: inline-block;
    margin: 0 5px 0 10px;
  }

  label, input {
    display: block;
    height: auto;
    margin: 0 auto;
    border-bottom: 0;
    font-size: 17px;
    line-height: 1.5em;
  }

  input[type=date] {
    font-size: 14px;
  }

  input[type=radio] {
    position: relative;
    width: 22px;
    height: 22px;
    vertical-align: top;
    border: 1px solid #e6e6e6;
    border-radius: 50%;
    appearance: none;
  }

  input[type=radio]:checked:before {
    content: "";
    display: block;
    position: absolute;
    top: calc(50% - 5px);
    left: calc(50% - 5px);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #222;
  }

  form {
    min-width: 490px;
    padding: 80px 0;
    border-radius: 20px;
    background-color: #fff;
    text-align: center;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  }

  form div {
    height: 100%;
    text-align: center;
    background-color: transparent;
    font-size: 17px;
    font-family: "adrianna-extended";
  }

  form div + div {
    margin: 25px auto 0;
  }

  button {
    margin-top: 35px;
  }
`;

export default Register;
