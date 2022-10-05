import React from "react";
import styled from "styled-components";
import LoginForm from "../../components/LoginForm/Container";
import TeamList from "../../components/TeamList/TeamList";
import { ButtonWrap } from "../../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";
import heroPoster from "../../assets/hero-poster.jpg";
import heroVideo from "../../assets/hero-video.mp4";
import Logo from "../../components/Logo/Logo";

export default function Lobby({ isLogin, teams, login, logout }) {
  return (
    <>
      <Hero>
        <video autoPlay loop muted playsInline poster={heroPoster}>
          <source src={heroVideo} type="video/mp4" />
        </video>
      </Hero>
      <Wrapper>
        <WelcomeBox>
          <h1>
            <Logo /> 김대리 어딨어
          </h1>
          <p>김대리 어딨어와 함께 누구보다 스마트한 출결관리를 시작하세요!</p>
        </WelcomeBox>
        <LoginBox>
          {isLogin ? (
            <>
              <h3>Your Teams</h3>
              <TeamList teams={teams} />
              <TeamButtonWrap>
                <Link to="/team/new">Create Team</Link>
                <button onClick={logout}>Logout</button>
              </TeamButtonWrap>
            </>
          ) : (
            <>
              <h3>Login</h3>
              <LoginForm login={login} />
            </>
          )}
        </LoginBox>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  height: 100%;
  width: 800px;
`;
const WelcomeBox = styled.div`
  width: 45%;
  margin-right: 30px;
  h1 {
    & svg {
      margin-right: 15px;
    }
    display: flex;
    align-items: center;
    font-size: 30px;
    font-weight: 900;
    margin-bottom: 21px;
  }
  p {
    font-size: 18px;
  }
`;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #323232;
  color: #eee;
  height: 320px;
  padding: 15px 30px;
  border-radius: 4px;
`;
const TeamButtonWrap = styled(ButtonWrap)`
  & button:last-child {
    background-color: #dd2c00;
  }
`;
const Hero = styled.div`
  position: absolute;
  min-width: 1280px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  overflow: hidden;
  & video {
    height: 100%;
  }
`;
