import React, { MouseEventHandler, useState } from "react";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { deleteScheduleById } from "./schedulesSlice";
import { deleteSchedule } from "../../utils/api/googleCalendar";

import Modal from "../common/Modal";
import ScheduleInfo from "./ScheduleInfo";

interface ScheduleProps {
  id: string;
  isStart: boolean;
  isEnd: boolean;
  summary: string;
  position: number;
}

function Schedule({ id, isStart, isEnd, summary, position }: ScheduleProps) {
  const scheduleData = useAppSelector((state) => state.schedules.byScheduleId[id]);
  const calendarId = useAppSelector((state) => state.auth.googleCalendarId);
  const googleAccessToken = useAppSelector((state) => state.auth.googleAccessToken);

  const [isShowScheduleInfo, setIsShowScheduleInfo] = useState(false);

  const dispatch = useAppDispatch();

  const deleteScheduleMutation = useMutation(deleteSchedule);

  const onClickDeleteSchedule: MouseEventHandler = async () => {
    deleteScheduleMutation.mutate({ googleAccessToken, calendarId, scheduleId: id });
    dispatch(deleteScheduleById(id));
  };

  return (
    <div>
      <ScheduleStyled
        isStart={isStart}
        isEnd={isEnd}
        position={position}
        onClick={() => {
          setIsShowScheduleInfo(true);
        }}
      >
        <Summary>{summary}</Summary>
      </ScheduleStyled>

      {scheduleData && (
        <Modal
          rootId="schedule-info"
          isShowModal={isShowScheduleInfo}
          onBackgroundClick={() => {
            setIsShowScheduleInfo(false);
          }}
        >
          <ScheduleInfo
            scheduleData={scheduleData}
            onClickDelete={onClickDeleteSchedule}
            onCloseButton={() => {
              setIsShowScheduleInfo(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

interface ScheduleStyledProps {
  isStart: boolean;
  isEnd: boolean;
  position: number;
  onClick: MouseEventHandler;
}

const Summary = styled.div`
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ScheduleStyled = styled.div<ScheduleStyledProps>`
  position: absolute;
  display: flex;
  align-items: center;
  margin-top: ${({ position }) => `${position * 22}px`};
  width: 100%;
  height: 20px;
  color: ${({ theme }) => theme.color.font};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.color.scheduleBackground};
  cursor: pointer;

  ${({ isStart, isEnd }) => {
    if (isStart && isEnd) {
      return css`
        border-radius: 5px;
        width: 90%;
      `;
    }

    if (isStart) {
      return css`
        border-radius: 5px 0 0 5px;
      `;
    }

    if (isEnd) {
      return css`
        border-radius: 0 5px 5px 0;
        width: 90%;
      `;
    }

    return css`
      border-radius: 0;
    `;
  }};
`;

export default Schedule;
