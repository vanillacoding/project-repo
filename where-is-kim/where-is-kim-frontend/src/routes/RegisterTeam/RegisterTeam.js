import React from "react";
import FormField from "../../components/FormField/FormField";
import { Link } from "react-router-dom";
import { ButtonWrap } from "../../components/LoginForm/LoginForm";
import styled from "styled-components";

export default function RegisterTeam({
  onSubmit,
  teamName,
  latitude,
  longitude,
  workOnTime,
  workOffTime,
  fileInput,
  OnlocaButtonClick,
}) {
  return (
    <Wrapper>
      <div>
        <h3>RESISTER TEAM</h3>
        <form onSubmit={onSubmit}>
          <FormField
            title="Team Name"
            type="text"
            controller={teamName}
            placeholder="Type your team name"
          />
          <SubFlex>
            <FormField
              title="Latitude"
              type="text"
              controller={latitude}
              placeholder="Type team address (latitude)"
            />
            <FormField
              title="Longitude"
              type="text"
              controller={longitude}
              placeholder="Type team address (longitude)"
            />
          </SubFlex>
          <LocaButton onClick={OnlocaButtonClick}>
            현재 위치 좌표 구하기
          </LocaButton>
          <FormField title="Work on Time" type="time" controller={workOnTime} />
          <FormField
            title="Work off Time"
            type="time"
            controller={workOffTime}
          />
          <legend style={{ fontSize: "16px", margin: "21px 0 10px" }}>
            Team Profile Picture
          </legend>
          <input type="file" ref={fileInput} />
          <ButtonWrap>
            <button>Resigter</button>
            <Link to="/">Back</Link>
          </ButtonWrap>
        </form>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 600px;
  padding: 30px 0;
  margin: auto;
  display: flex;
  & > div {
    width: 100%;
    align-self: center;
  }
`;
const SubFlex = styled.div`
  display: flex;
  & > fieldset:first-child {
    width: calc(50% - 40px);
    margin-right: 21px;
  }
  & > fieldset:last-child {
    flex: 1;
  }
`;
const LocaButton = styled.button`
  background-color: #666;
  border: 0;
  vertical-align: top;
  line-height: 35px;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  text-transform: uppercase;
  display: block;
  width: 100%;
  margin-bottom: 21px;
`;
