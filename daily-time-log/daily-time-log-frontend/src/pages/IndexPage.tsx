import React, { useEffect, useState } from "react";
import styled from "styled-components";

import background from "../assets/login-background.png";
import { boxShadow } from "../assets/styles/utilsStyled";

import Loading from "../features/common/Loading";
import GoogleAuth from "../features/auth/GoogleAuth";
import MonthCalendar from "../features/calendar/MonthCalendar";

function IndexPage() {
  const [isImgLoading, setIsImgLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = background;

    img.onload = () => {
      setIsImgLoading(false);
    };
  }, []);

  if (isImgLoading) {
    return <Loading />;
  }

  return (
    <IndexPageWrap>
      <ContentWrap>
        <TitleWrap>
          <div>DAILY</div>
          <div>TIME</div>
          <div>LOG</div>
        </TitleWrap>
        <LoginWrap>
          <CalendarWrap>
            <MonthCalendar />
          </CalendarWrap>

          <div style={{ height: "36px" }}>
            <GoogleAuth />
          </div>
        </LoginWrap>
      </ContentWrap>
    </IndexPageWrap>
  );
}

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 300px;
  margin: 1rem;
  padding: 0 2rem;
  box-sizing: border-box;
`;

const TitleWrap = styled.div`
  font-size: 6rem;
  margin: 1rem;
  text-align: center;
  width: 300px;
  color: ${({ theme }) => theme.palette.black};

  @media only screen and (max-width: 768px) {
    font-size: 4.5rem;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  align-items: stretch;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const CalendarWrap = styled.div`
  height: 70%;
  border-radius: 5px;
  overflow: hidden;
  ${boxShadow}

  @media only screen and (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const IndexPageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 100vh;
  background-image: url(${background});
`;

export default IndexPage;
