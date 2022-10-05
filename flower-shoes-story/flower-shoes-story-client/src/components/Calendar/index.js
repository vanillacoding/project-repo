import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";

import { formatEvents } from "../../utils";
import { getEvents, updateEvent } from "../../api";

import TextInput from "../Shared/TextInput";
import Dropdown from "../Shared/Dropdown";
import Button from "../Shared/Button";

const Calendar = () => {
  const [date, setDate] = useState([]);
  const [event, setEvent] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("visit");

  const options = ["visit", "vacation", "anniversary"];

  const { mutate } = useMutation(updateEvent, {
    onSuccess: ({ result, events }) => {
      if (result === "success") {
        const enrolledEvents = formatEvents(events);

        setEvent(enrolledEvents);
      }
    },
  });

  useEffect(() => {
    const getEvent = async () => {
      const { events } = await getEvents();
      const enrolledEvents = formatEvents(events);

      setEvent(enrolledEvents);
    };

    getEvent();
  }, []);

  const handleClick = (targetDate) => {
    if (date.length === 2) {
      setDate([targetDate]);
      return;
    }

    setDate((prev) => [...prev, targetDate]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (new Date(date[0].date) > new Date(date[1].date)) {
      setErrorMessage("날짜를 확인해주세요");
      return;
    };

    const targetEvent = {
      eventName: selectedOption,
      startDate: date[0].date,
      endDate: date[1].date,
    };

    mutate(targetEvent);

    setDate([]);
  };

  return (
    <Wrapper>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={event}
        dateClick={handleClick}
      />

      <RegisterBox>
        <form onSubmit={handleSubmit}>
          <TextInput label="startDate" name="startDate" value={date[0]?.dateStr} readOnly />
          <TextInput label="endDate" name="endDate" value={date[1]?.dateStr} readOnly />

          <Dropdown options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

          <Button type="submit">Submit</Button>
        </form>

        {errorMessage && errorMessage}
      </RegisterBox>
    </Wrapper>
  );
};

const RegisterBox = styled.div`
  form {
    text-align: center;
  }

  form button {
    height: 45px;
  }

  input {
    width: 100px;
  }

  label ~ label {
    margin-left: 10px;
  }
`;

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;

  .fc-theme-standard {
    font-family: "adrianna-expended";
  }

  .fc-theme-standard th {
    padding: 8px 0;
  }

  .fc-theme-standard td,
  .fc-theme-standard th {
    border: 0;
  }

  .fc-toolbar-title {
    font-family: "adrianna-expended";
    font-size: 1.8vw;
    transition: 0.85s cubic-bezier(0.82, 0.01, 0.21, 1) 0s;
  }

  .fc-toolbar-chunk * {
    background-color: transparent !important;
    border: none !important;
    color: #222 !important;
    font-family: "adrianna";
    text-transform: uppercase;
    font-size: 1.5vw;
    font-weight: 600;
    opacity: 1 !important;
    transition: 0.85s cubic-bezier(0.82, 0.01, 0.21, 1) 0s;
  }

  .fc-scrollgrid-section-header {
    padding: 10px;
  }

  .fc-view-harness * {
    font-family: "adrianna-expended";
    border: 0 !important;
    font-size: 13px;
  }

  .fc-scroller-harness {
    padding-bottom: 10px;
  }

  .fc-day-today {
    position: relative;
    background-color: transparent !important;
    color: #fff;
  }

  .fc-day-today:after {
    content: "";
    z-index: -1;
    display: block;
    top: 0;
    left: 0;
    position: absolute;
    background-color: #26294b;
    border-radius: 50%;
    width: 22px;
    height: 22px;
  }

  .fc .fc-daygrid-day-number {
    padding: 5px;
  }

  .fc-daygrid-day-top {
    flex-direction: column !important;
  }

  .fc-h-event {
    border: none;
    background-color: #26294b !important;
    opacity: 0.2;
  }

  .fc-h-event .fc-event-title-container {
    padding: 2px 0 0 2px;
  }

  .fc .fc-button .fc-icon {
    font-size: 2vw;
  }
`;

export default Calendar;
