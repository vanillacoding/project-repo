import dayjs from "dayjs";
import React, { MouseEventHandler, useState } from "react";
import { MdCalendarToday, MdClose, MdOutlineAccessTime, MdOutlineSubject } from "react-icons/md";
import { useMutation } from "react-query";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/store";

import Button from "../common/Button";
import { Input } from "../common/Input";
import { createSchedule } from "../../utils/api/googleCalendar";
import { addGoogleSchedules } from "./schedulesSlice";

interface CreateScheduleProps {
  onCloseButton: MouseEventHandler;
  date: {
    date: number;
    month: number;
    year: number;
    timezone: string;
  };
}

function CreateSchedule({ onCloseButton, date }: CreateScheduleProps) {
  const calendarId = useAppSelector((state) => state.auth.googleCalendarId);
  const googleAccessToken = useAppSelector((state) => state.auth.googleAccessToken);
  const schedulesData = useAppSelector((state) => state.schedules.schedulesData);

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(dayjs().set(date).format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().set(date).format("YYYY-MM-DD"));

  const isDisabledButton = dayjs(endDate).diff(dayjs(startDate)) < 0;

  const dispatch = useAppDispatch();
  const createScheduleMutation = useMutation(createSchedule, {
    onSuccess: (data) => {
      dispatch(addGoogleSchedules([...schedulesData, data]));
    },
  });

  const onClickSave: MouseEventHandler = (e) => {
    if (isDisabledButton) {
      // eslint-disable-next-line no-alert
      return alert("일정 종료 날짜가 시작 날짜보다 이전입니다.");
    }

    createScheduleMutation.mutate({
      googleAccessToken,
      calendarId,
      description,
      summary,
      start: {
        date: startDate,
        timeZone: date.timezone,
      },
      end: {
        date: dayjs(endDate).tz(date.timezone).add(1, "day").format("YYYY-MM-DD"),
        timeZone: date.timezone,
      },
    });

    onCloseButton(e);
  };

  return (
    <CreateScheduleStyled>
      <Header>
        <MdClose onClick={onCloseButton} />
      </Header>
      <Content>
        <Row>
          <MdCalendarToday />
          <Input
            type="text"
            placeholder="제목"
            sized="medium"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            fullWidth
            border
          />
        </Row>
        <Row>
          <MdOutlineAccessTime />
          <Input
            type="date"
            sized="small"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          -
          <Input
            type="date"
            sized="small"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Row>
        <Row>
          <MdOutlineSubject />
          <Input
            type="text"
            placeholder="설명"
            sized="medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </Row>
      </Content>

      <Button size="medium" onClick={onClickSave} fullWidth disabled={isDisabledButton}>
        저장
      </Button>
    </CreateScheduleStyled>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.3rem;
`;

const Content = styled.div`
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

const CreateScheduleStyled = styled.div`
  width: 380px;
  padding: 30px;
  background-color: ${({ theme }) => theme.color.backgroundColor};
  color: ${({ theme }) => theme.color.font};
  font-size: 1.5rem;
`;

export default CreateSchedule;
