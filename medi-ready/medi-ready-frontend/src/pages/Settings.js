import React, { useState } from "react";
import { useMutation } from "react-query";

import { updateSettings } from "../api";

import styled from "styled-components";
import Button from "../components/Shared/Button";
import Loading from "../components/Shared/Loading";
import TextInput from "../components/Shared/TextInput";
import { PageTitle, PageContent } from "../components/Base";

const Settings = ({ userInfo }) => {
  const [input, setInput] = useState({ name: "", address: "" });
  const { isLoading, mutate } = useMutation(updateSettings);

  const { name, address } = input;
  const { pharmacy_name, pharmacy_address } = userInfo;

  if (isLoading) {
    return <Loading />;
  }

  const handleChange = (event) => {
    const activeInput = {
      ...input,
      [event.target.name]: event.target.value,
    };

    setInput(activeInput);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    mutate({ name, address });
  };

  return (
    <StyledPageContent>
      <PageTitle>Settings</PageTitle>

      <form onSubmit={handleSubmit}>
        <StyledTextInput
          name="name"
          label="pharmacy name"
          placeholder={pharmacy_name}
          onChange={handleChange}
        />
        <StyledTextInput
          name="address"
          label="pharmacy address"
          placeholder={pharmacy_address}
          onChange={handleChange}
        />
        <Button type="submit">수정하기</Button>
      </form>
    </StyledPageContent>
  );
};

const StyledPageContent = styled(PageContent)`
  width: 500px;

  input {
    margin-top: 20px;
  }

  button {
    margin-top: 20px;
  }
`;

const StyledTextInput = styled(TextInput)`
  background-color: #fff;
`;

export default Settings;
