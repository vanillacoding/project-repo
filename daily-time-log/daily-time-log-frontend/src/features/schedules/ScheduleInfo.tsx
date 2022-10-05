import React, { MouseEventHandler } from "react";
import { MdCalendarToday, MdClose, MdDelete, MdOutlineSubject } from "react-icons/md";
import styled from "styled-components";
import dayjs from "dayjs";

import { ScheduleInfo as ScheduleInfoType } from "./schedulesSlice";

interface ScheduleInfoProps {
  scheduleData: ScheduleInfoType;
  onClickDelete: MouseEventHandler<SVGElement>;
  onCloseButton: MouseEventHandler<SVGElement>;
}

function ScheduleInfo({ scheduleData, onClickDelete, onCloseButton }: ScheduleInfoProps) {
  const startDate = dayjs(scheduleData.start.date)
    .tz(scheduleData.start.timeZone)
    .format("YYYY-MM-DD");

  const endDate = dayjs(scheduleData.end.date)
    .tz(scheduleData.end.timeZone)
    .subtract(1, "date")
    .format("YYYY-MM-DD");

  return (
    <ScheduleInfoStyled>
      <Header>
        <MdDelete onClick={onClickDelete} />
        <MdClose onClick={onCloseButton} />
      </Header>
      <Info>
        <Summary>
          <MdCalendarToday />
          <div>
            <div>{scheduleData.summary}</div>
            <div className="date">
              {startDate} - {endDate}
            </div>
          </div>
        </Summary>
        {scheduleData.description && (
          <Description>
            <MdOutlineSubject /> {scheduleData.description}
          </Description>
        )}
      </Info>
    </ScheduleInfoStyled>
  );
}

const Description = styled.div`
  display: flex;
`;

const Summary = styled.div`
  display: flex;
  margin-bottom: 15px;

  .date {
    font-size: 1.2rem;
  }
`;

const Info = styled.div`
  svg {
    margin-right: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;

  svg {
    cursor: pointer;
  }
  svg + svg {
    margin-left: 1rem;
  }
`;

const ScheduleInfoStyled = styled.div`
  width: 550px;
  padding: 30px;
  background-color: ${({ theme }) => theme.color.backgroundColor};
  color: ${({ theme }) => theme.color.font};
  font-size: 1.5rem;
`;

export default ScheduleInfo;
