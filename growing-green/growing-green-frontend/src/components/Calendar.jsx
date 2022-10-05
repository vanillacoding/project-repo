import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFormatedDate } from '../utils/getFormatedDate';

export default function Calendar() {
  const [date, setDate] = useState({
    year: null,
    month: null,
    week: null,
    day: null,
  });

  useEffect(() => setDate(getFormatedDate(new Date())), []);

  return (
    <Wrapper>
      <div className="left-hook"></div>
      <div className="right-hook"></div>
      <div className="month-wrapper">
        <h3 className="month-name">{date.month}</h3>
      </div>
      <div className="date-wrapper">
        <h1 className="day">{date.day}</h1>
        <h3 className="week-name">{date.week}</h3>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  font-family: 'Gill Sans';
  color: #2a1618;
  margin: 9rem 0 2rem 1rem;

  .left-hook {
    position: absolute;
    width: 8px;
    height: 24px;
    background: #2a1618;
    border-radius: 10px;
    top: -11px;
    left: 15px;
  }

  .right-hook {
    position: absolute;
    width: 8px;
    height: 24px;
    background: #2a1618;
    border-radius: 5px;
    top: -11px;
    right: 15px;
  }

  .month-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30%;
    background: ${({ theme }) => theme.baseTheme.colors.red};
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.3) 3px 0px 0px inset;

    .month-name {
      margin: 0;
    }
  }

  .date-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 70%;
    background: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px,
      rgba(0, 0, 0, 0.3) 0px 7px 3px -3px, rgba(0, 0, 0, 0.2) 3px -3px 0px inset;

    .day {
      margin: 0;
      vertical-align: middle;
      display: table-cell;
      font-size: 2.3em;
    }

    .week-name {
      font-weight: 400;
      margin-top: -0.1rem;
      margin-bottom: 0.8rem;
      font-size: 1em;
    }
  }
`;
