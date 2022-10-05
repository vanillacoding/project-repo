import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import dayjs from "dayjs";

import { useAppSelector, useAppDispatch } from "../../app/store";
import { loadCalendar, DateInfo } from "./calendarSlice";
import MonthCalendarDate from "./MonthCalendarDate";

export const WEEKS = ["일", "월", "화", "수", "목", "금", "토"];

function MonthCalendar() {
  const allDatesId = useAppSelector((state) => state.calendar.allDatesId);
  const schedulesData = useAppSelector((state) => state.schedules.schedulesData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const now = dayjs();
    const dateInfo: DateInfo = {
      year: now.year(),
      month: now.month(),
      date: now.date(),
      timezone: dayjs.tz.guess(),
    };

    dispatch(loadCalendar({ dateInfo, schedules: schedulesData }));
  }, [schedulesData]);

  return (
    <MonthCalenderWrap>
      <MonthCalendarDays>
        {WEEKS.map((day) => {
          return <span key={day}>{day}</span>;
        })}
      </MonthCalendarDays>
      <MonthCalenderDates>
        {allDatesId?.map((dateId) => {
          return <MonthCalendarDate key={dateId} dateId={dateId} />;
        })}
      </MonthCalenderDates>
    </MonthCalenderWrap>
  );
}

const gridColumns = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const MonthCalendarDays = styled.div`
  ${gridColumns}
  justify-items: center;
  font-size: 13px;
  color: ${({ theme }) => theme.color.font};
`;

const MonthCalenderDates = styled.div`
  ${gridColumns}
  grid-template-rows: repeat(6, 1fr);
  height: 100%;

  @media only screen and (max-width: 768px) {
    height: auto;
  }
`;

const MonthCalenderWrap = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.mainBackgroundColor};
`;

export default MonthCalendar;
