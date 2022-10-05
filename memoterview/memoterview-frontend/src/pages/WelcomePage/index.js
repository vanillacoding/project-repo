import React from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.Arsenic};
`;

const InnerPageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40vw;;
  height: 50vh;
  background-color: ${({ theme }) => theme.Snow};
  color: ${({ theme }) => theme.GulfBlue};
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const Title = styled.div`
  position: absolute;
  top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.5em;
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  font-size: 1.2em;
`;

const EditField = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40%;
`;

const Input = styled.input`
  margin: 5px 20px;
  padding: 3px 10px 0;
  width: 70%;
  height: 25px;
  font-size: 1em;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  background-color: ${({ theme }) => theme.GulfBlue};
  border-radius: 3px;
  color: ${({ theme }) => theme.Snow};
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.GulfBlue};
    background: ${({ theme }) => theme.ButtonGreen};
  }
`;

export default function WelcomePage({ onAskPermissionBtnClick, onInputChange }) {

  return (
    <>
      <PageWrapper>
        <InnerPageWrapper>
          <Title>면접방 입장을 위해 하단의 정보를 입력해주세요</Title>
          <InputWrapper>
            <EditField>
              <Label>이름: </Label>
              <Input name="name" onChange={onInputChange} />
            </EditField>
            <EditField>
              <Label>이메일: </Label>
              <Input name="email" onChange={onInputChange} />
            </EditField>
          </InputWrapper>
          <ButtonWrapper>
            <Button onClick={onAskPermissionBtnClick}>면접방 입장</Button>
          </ButtonWrapper>
        </InnerPageWrapper>
      </PageWrapper>
    </>
  );
}
