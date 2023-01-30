import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "../../config/constants/theme";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorWrapper>
        <ErrorBox>
          <ErrorCode>500</ErrorCode>
          <ErrorImage />
        </ErrorBox>
        <ErrorMessage>Internal Server Error</ErrorMessage>
      </ErrorWrapper>
      <HomeButton onClick={() => navigate("/")}>
        <Home>홈으로</Home>
      </HomeButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.white};
  height: 100%;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorCode = styled.span`
  font-size: 130px;
  font-weight: 800;
  color: rgba(45, 101, 173, 1);
`;

const ErrorImage = styled.img.attrs({
  src: "https://s3-alpha-sig.figma.com/img/8910/7ee8/44f3635380822bad3c731d99ac54eae1?Expires=1667174400&Signature=MJ2mHAjUZJvrOTkURbXJ9ysIN8Q0vI61T6pRkrUbXwk2XKYQa2s2neiW2E1Gs76r2c1RUro-wgVca~JvhVUl3xwmgU-lEDot3Ni-iJXfcRyZTxDeYH-m3s8z4zZdjxARr9UchZdSglLG1O79T0TFtOuJqqVzND~ortHZvn1kb5i0OeJXSr07YKVNuwJLSx8GK63QrfOZGU8TY1rMe2~StRL5f2ZgYmE1ZBumOdrJZG-Q-36ZbGYfStq6tjt2kxTAkAuwaCLq-Ahgvjy1SAyMZrCxYTN3YQLoMSdTCUD16hqgrtjGf-AX97dDizchwcsSRKI~xXVS3A1SrFM6MN8U1w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  alt: "error image",
})`
  width: 580px;
  height: 450px;
`;

const ErrorMessage = styled.p`
  font-size: 40px;
`;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  padding: 10px;
  border: 1.5px solid black;
  border-radius: 5px;
  background-color: ${theme.white};
  cursor: pointer;

  &:hover {
    background-color: ${theme.gray};
    color: ${theme.black};
    transition: all 0.1s ease-in-out;
  }
`;

const Home = styled.span`
  font-size: 20px;
`;
