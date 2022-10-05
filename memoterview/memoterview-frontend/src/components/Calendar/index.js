import "react-calendar/dist/Calendar.css";

import { format } from "date-fns";
import React from "react";
import ReactCalendar from "react-calendar";
import styled from "styled-components";

const TotalResultCalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .react-calendar {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.LinkWater};
  }

  .react-calendar__navigation {
    height: 30px;
  }

  .react-calendar__navigation__label,
  .react-calendar__navigation__arrow,
  .react-calendar__month-view__weekdays {
    color: ${({ theme }) => theme.SpanishBlue};
  }

  .react-calendar__navigation {
    background-color: #EBEBEB;
  }

  .react-calendar__month-view__days__day {
    color: ${({ theme }) => theme.GulfBlue};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${({ theme }) => theme.ItemColor};
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${({ theme }) => theme.Mischka};
  }

  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:focus {
    background: ${({ theme }) => theme.ButtonGreen};
    color: white;
  }

  .react-calendar__tile--now {
    color: black;
    background: ${({ theme }) => theme.Solitude};

    &:hover {
      background: ${({ theme }) => theme.Solitude};
      color: black;
    }
  }

  .react-calendar__tile {
    padding: 12px 10px;
  }
`;

export default function Calendar() {
  return (
    <TotalResultCalendarWrapper>
      <ReactCalendar
        calendarType="US"
        formatDay={(locale, date) => format(date, "d")}
        formatMonthYear	={(locale, date) => format(date, "MMMM dd yyyy")}
      />
    </TotalResultCalendarWrapper>
  );
}
