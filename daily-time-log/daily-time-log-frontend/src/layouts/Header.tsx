import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import dayjs from "dayjs";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../app/store";
import { loadCalendar } from "../features/calendar/calendarSlice";

import Button from "../features/common/Button";
import Profile from "../features/auth/Profile";

function Header() {
  const displayedInfo = useAppSelector((state) => state.calendar.displayed);
  const schedulesData = useAppSelector((state) => state.schedules.schedulesData);

  const dispatch = useAppDispatch();
  const theme = useContext(ThemeContext);

  const onNextButtonClick = () => {
    dispatch(
      loadCalendar({
        dateInfo: { ...displayedInfo, month: displayedInfo.month + 1 },
        schedules: schedulesData,
      }),
    );
  };

  const onPrevButtonClick = () => {
    dispatch(
      loadCalendar({
        dateInfo: { ...displayedInfo, month: displayedInfo.month - 1 },
        schedules: schedulesData,
      }),
    );
  };

  return (
    <HeaderWrap>
      <div className="left">
        <HeaderTitle>DAILY TIME LOG</HeaderTitle>
      </div>

      <div className="middle">
        <Button size="medium" background={false} onClick={onPrevButtonClick}>
          <MdNavigateBefore color={theme.color.font} size="2rem" />
        </Button>

        <div>{dayjs().set(displayedInfo).format("YYYY년 MM월 DD일")}</div>

        <Button size="medium" background={false} onClick={onNextButtonClick}>
          <MdNavigateNext color={theme.color.font} size="2rem" />
        </Button>
      </div>

      <div className="right">
        <Profile />
      </div>
    </HeaderWrap>
  );
}

const HeaderTitle = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.title};
`;

const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: ${({ theme }) => theme.size.headerHeight};
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  background-color: ${({ theme }) => theme.color.backgroundColor};
  color: ${({ theme }) => theme.color.font};

  .left {
    flex: 1 0 auto;
    padding-left: 30px;
    padding-right: 30px;

    @media only screen and (max-width: 768px) {
      display: none;
    }
  }
  .middle {
    display: flex;
    flex: 1 1 100%;
    font-size: 24px;
    align-items: center;
  }
  .right {
    flex: 0 0 auto;
  }
`;

export default Header;
