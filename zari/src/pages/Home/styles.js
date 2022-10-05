import styled from 'styled-components';

export const Home = {};

Home.Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

Home.Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  filter: brightness(115%);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

Home.LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 30%;
  margin: auto;
  background-color: white;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  min-width: 300px;
  z-index: 5;
`;

Home.TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 50%;
  margin: 0 auto;
`;

Home.Title = styled.h1`
  margin: auto;
`;

Home.LoginButton = styled.div`
  display: flex;
  align-content: center;
  font-family: system-ui, sans-serif;
  font-weight: 500;
  font-size: 16px;
  width: fit-content;
  padding: 15px;
  margin: auto;
  line-height: 40px;
  border-radius: 20px;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #989ca1;
  text-align: center;
  background: #FFF;
  color: black;
`;

Home.IconWrapper = styled.div`
  display: inline-flex;
  align-content: center;
  width: auto;
  height: 100%;
`;

Home.GoogleIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: auto 10px;
`;
