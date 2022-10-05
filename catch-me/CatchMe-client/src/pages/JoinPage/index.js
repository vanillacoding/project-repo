import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";

import { makeNewRoom } from "../../redux/slices/multiplaySlice";
import useKakao from "../../hooks/useKakao";
import { generateRandomCode } from "../../utils/random";
import PageCard from "../../components/shared/PageCard";
import MainPageLayout from "../../components/MainPageLayout";

const JoinPage = () => {
  const [invitationCode, setInvitationCode] = useState("");
  const history = useHistory();
  const { handleMessageSend } = useKakao();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    const randomCode = generateRandomCode();
    
    dispatch(makeNewRoom(randomCode));

    setInvitationCode(randomCode);
  }, []);

  const handleInvitationButtonClick = () => {
    handleMessageSend(`${invitationCode}`);
  };

  const handleEnterButtonClick = () => {
    history.push(`waiting/${invitationCode}`);
  };

  const handleBackButtonClick = () => {
    history.push("/");
  };

  const handleInputClick = () => { // copy 되었다고 알림 띄우기
    window.navigator.clipboard.writeText(`${process.env.PORT}/waiting/${invitationCode}`);
    
    const alarmMessage = "Copied!";
    
    addToast(alarmMessage, {
      appearance: "info",
      autoDismiss: true,
    });
  };

  return (
    <MainPageLayout>
      <PageCard width={500} height={400}>
        <Content>
          <Title>Make Room</Title>
          <Input 
            type="text" 
            value={`${process.env.PORT}/waiting/${invitationCode}`} 
            onClick={handleInputClick} 
            readOnly
          />
          <ButtonField>
            <SmallButtonField>
              <Button onClick={handleInvitationButtonClick}>
                Share
              </Button>
              <Button onClick={handleEnterButtonClick}>
                Enter
              </Button>
            </SmallButtonField>
            <BackButton onClick={handleBackButtonClick}>
              Back
            </BackButton>
          </ButtonField>
        </Content>
      </PageCard>
    </MainPageLayout>
  );
};

const Title = styled.h2`
  font-size: 40px;
  margin-top: 10px;
  margin-bottom: 0;
`;

const ButtonField = styled.div`
  display: flex;
  width: 90%;
  height: 30%;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SmallButtonField = styled.div`
  display: flex;
  width: 100%;
  height: 35%;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  display: flex;
  width: 40%;
  height: 100%;
  margin: 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background: #e55643;
  color: white;
  box-shadow: 0 6px 0 #AB3C2D, 0 5px 10px rgba(0, 0, 0, 0.35);
  text-shadow: 0 -2px 2px rgba(175, 49, 95, 0.9);
  cursor: pointer;

  :hover {
    background-color: #F16A58;
    text-shadow: 0 -1px 1px rgba(175, 49, 95, 0.9), 0 0 5px rgba(255, 255, 255, 0.8);
  }

  :active, 
  :focus {
    box-shadow: 0 8px 0 #AB3C2D, 0 12px 10px rgba(0, 0, 0, 0.3);
  }
`;

const BackButton = styled.button`
  width: 83%;
  height: 35%;
  margin-top: 10px;
  border-radius: 5px;
  border: 0px;
  color: white;
  background: #2b9f5e;
  box-shadow: 0 6px 0 #21844D, 0 5px 10px rgba(0, 0, 0, 0.35);
  text-shadow: 0 -2px 2px rgba(175, 49, 95, 0.9);
  cursor: pointer;

  :hover {
    background-color: #37BB71;
    text-shadow: 0 -1px 1px rgba(175, 49, 95, 0.9), 0 0 5px rgba(255, 255, 255, 0.8);
  }

  :active, 
  :focus {
    box-shadow: 0 8px 0 #21844D, 0 12px 10px rgba(0, 0, 0, 0.3);
  }
`;

const Content = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  height: 10%;
  border-radius: 5px;
  border: 0;
  margin-top: 70px;
  text-align: center;
`;

export default JoinPage;
