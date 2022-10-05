import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url("/images/background.png");
  background-size: contain;
`;

const Title = styled.div`
  margin-top: 90px;
  font-size: 150px;
  font-weight: bold;
`;

const GreetMessage = styled.div`
  font-size: 30px;
`;

export default function Greeting() {
  return (
    <Background>
      <Title>BOTTARI</Title>
      <GreetMessage>bottari 앱 설치 감사합니다!</GreetMessage>
    </Background>
  );
};
