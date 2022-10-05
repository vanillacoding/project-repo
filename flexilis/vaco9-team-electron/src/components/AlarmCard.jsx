import React from 'react';
import { formatTime } from '../util/index';
import styled from 'styled-components';
import { color } from '../css/color';

const Card = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${color.WHITE};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const Time = styled.span`
  text-align: center;
  width: 30%;
  margin: auto 0;
  opacity: 0.6;
  font-size: 24px;
  color: ${color.MAIN_FONT};
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
`;

const DeleteButton = styled.button`
  align-self: right;
  height: 20px;
  border: none;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`;

const ToggleWrapper = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 600;
  user-select: none;
  &:not(:last-child) {
      margin-bottom: 10px;
  }
  .l {
      margin-left: 10px;
  }
`;

const Toggle = styled.input`
  position: absolute;
  align-self: center;
  z-index: -1;
   width: 1px;
  height: 1px;
  opacity: 0;
  &:checked {
      ~ i {
          background: ${color.SUB};
          &:after {
              left: 50%;
              background: ${color.HOVER};
          }
      }
  }
`;

const ToggleButton = styled.i`
  position: relative;
  display: block;
  outline: 0;
  width: 20px;
  height: 10px;
  padding: 2px;
  cursor: pointer;
  user-select: none;
  border-radius: 10px;
  background: ${color.LIGHT};
  transition: all 0.4s ease;
  &:after,
  &:before {
      position: relative;
      display: block;
      content: "";
      width: 50%;
      height: 100%;
  }
  &:after {
      left: 0;
      border-radius: 50%;
      background: ${color.DARK};
      transition: all 0.2s ease;
  }
  &:before {
      display: none;
  }
`;

export default function AlarmCard({ time, onDeleteButtonClick, onToggleClick }) {
  const { period, hhmm } = formatTime(time);

  return (
    <Card>
      <Time>{period}</Time>
      <Time>{hhmm}</Time>
      <ToggleWrapper>
        <Toggle
          type="checkbox"
          id={time}
          defaultChecked={true}
          onChange={onToggleClick}
        />
        <ToggleButton />
      </ToggleWrapper>
      <DeleteButtonWrapper>
        <DeleteButton
          id={time}
          onClick={onDeleteButtonClick}
        >x</DeleteButton>
      </DeleteButtonWrapper>
    </Card>
  );
}
