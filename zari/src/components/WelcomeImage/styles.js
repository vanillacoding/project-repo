import styled from 'styled-components';

export const WelcomeImage = {};

WelcomeImage.Container = styled.div`
position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

WelcomeImage.Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  filter: brightness(115%);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

WelcomeImage.TitleContainer = styled.div`
  display: flex;
  padding-left: 100px;
  margin: auto 0;
  z-index: 5;
`;

WelcomeImage.Title = styled.h1`
  font-weight: 900;
  color: white;
  font-size: 120px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;
