import React, { useState } from "react";
import styled from "styled-components";

import ModalView from "../ModalView";

const Title = styled.h2`
  text-align: center;
  font-size: 1.5em;
  font-weight: 500;
`;

const EditField = styled.div`
  display: flex;
  margin: 20px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  /* height: 70%; */
  margin-left: 15px;
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  justify-content: flex-start;
  width: 10%;
  align-items: center;

  font-size: 1.1em;
  font-weight: 400;
`;

const Input = styled.input`
  margin: 5px 20px;
  padding: 3px 10px 0;
  width: 70%;
  height: 25px;
  font-size: 1em;
  /* border-color: ${({ theme }) => theme.Snow} */
`;

const Button = styled.button`
  width: 70px;
  height: 40px;
  font-size: 1em;
  margin: 5px;
  cursor: pointer;
  background-color: ${(props) =>
    props.buttonType === "ok" ? props.theme.GulfBlue : props.theme.Whisper};
  color: ${(props) =>
    props.buttonType === "ok" ? props.theme.Snow : props.theme.GulfBlue};
  &:hover {
    opacity: 0.8;
  }
  border: 1px solid ${({ theme }) => theme.Solitude};
  border-radius: 4px;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 10px;
`;

export default function IntervieweeAddModalView({
  onFormSubmitBtnClick,
  onCancleBtnClick,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [intervieweeInfo, setIntervieweeInfo] = useState({
    name: "",
    email: "",
  });

  function handleInputChange(e) {
    e.preventDefault();

    const intervieweeInputType = e.target.name;
    const value = e.target.value;

    setIntervieweeInfo({
      ...intervieweeInfo,
      [intervieweeInputType]: value,
    });
  }

  function handleFileSelected(e) {
    const selectedFile = e.target.files[0];
    setSelectedFile(selectedFile);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    onFormSubmitBtnClick({ pdf: selectedFile, intervieweeInfo });
  }

  return (
    <ModalView padding="20px" width="600px" height="410px">
      <Title>면접자 등록</Title>
      <Form onSubmit={handleFormSubmit}>
        <EditField>
          <Label>이름</Label>
          <Input
            name="name"
            value={intervieweeInfo.name}
            onChange={handleInputChange}
            required
          />
        </EditField>
        <EditField>
          <Label>이메일</Label>
          <Input
            name="email"
            type="email"
            value={intervieweeInfo.email}
            onChange={handleInputChange}
            required
          />
        </EditField>
        <EditField>
          <Label>이력서</Label>
          <Input
            onChange={handleFileSelected}
            type="file"
            accept="application/pdf"
            required
          />
        </EditField>
        <BtnGroup>
          <Button buttonType="cancel" onClick={onCancleBtnClick}>
            취소
          </Button>
          <Button type="submit" buttonType="ok">
            제출
          </Button>
        </BtnGroup>
      </Form>
    </ModalView>
  );
}
