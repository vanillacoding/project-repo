import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { getSchedule } from "../../../actions/todayGame";
import { formatDate } from "../../../utils/date";
import LoadingSchedule from "./LoadingScheduleList";
import ScheduleList from "./ScheduleList";

const Wrapper = styled.article`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  &::before {
    width: 480px;
    height: 240px;
    background: ${({ theme }) => theme.color.blue};
    display: block;
    position: absolute;
    bottom: 10px;
    left: 0;
    content: "";
  }
`;

const DateBox = styled.div`
  padding: 30px 30px 0 0;
  position: relative;
  font-family: "Bebas Neue";
  font-size: ${({ theme }) => theme.fontSize.biggest};
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.color.white};
`;

export default function Schedule() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const schedule = useSelector((state) => state.todayGame.schedule);
  const dispatch = useDispatch();

  const today = formatDate(new Date(), "yyyy-MM-dd-eee");

  useEffect(() => {
    if (schedule.length < 1) {
      setIsLoading(true);
      dispatch(getSchedule(formatDate(new Date(), "yyyyMMdd")));
      return;
    }

    if (schedule.result === "none") {
      setError("경기 일정이 없습니다.");
    }

    if (schedule.result === "failure") {
      setError("데이터를 로드하는 데 실패하였습니다.");
    }

    setIsLoading(false);
  }, [schedule]);

  return (
    <Wrapper>
      {isLoading
        ? <LoadingSchedule />
        : (
          <>
            <DateBox>
              <p>{today.substring(0, 4)}</p>
              <p>
                {`${today.substring(5, 7)}/${today.substring(8, 10)}`}
              </p>
              <p>{today.substring(11, 14)}</p>
            </DateBox>
            <ScheduleList
              schedule={schedule}
              error={error}
            />
          </>
        )}
    </Wrapper>
  );
}
