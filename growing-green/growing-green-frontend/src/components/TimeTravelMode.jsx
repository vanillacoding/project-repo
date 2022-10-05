import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  startTimeTravel,
  stopTimeTravel,
  selectWeekNumber,
} from '../redux/modules/timeTravel';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import addHours from 'date-fns/addHours';
import differenceInDays from 'date-fns/differenceInDays';

export default function TimeTravelMode() {
  const dispatch = useDispatch();
  const { currentPlant } = useSelector((state) => state.plants);
  const { isTimeTravelMode, plantsInWeek } = useSelector(
    (state) => state.timeTravel,
  );
  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const today = new Date(utc + KR_TIME_DIFF);

  function onStartButtonClick() {
    dispatch(startTimeTravel(currentPlant));
  }

  function onStopButtonClick() {
    dispatch(stopTimeTravel());
  }

  function createGrowthDayText(plant, date) {
    const { createdAt } = plant;
    const createdDate = new Date(createdAt);

    const today = new Date(date);
    const NumberOfElapsedDate = differenceInDays(today, createdDate);
    const passedDays = [];
    let text = '';

    for (let i = 0; i < NumberOfElapsedDate; i++) {
      const passedDay = addHours(createdDate, 24 * (i + 1));

      passedDays.push(passedDay);
    }

    if (passedDays.length + 1 === 14) {
      text += '- 식물의 성장날짜입니다(2단계->3단계)';
    } else if (passedDays.length + 1 === 7) {
      text += '- 식물의 성장날짜입니다(1단계->2단계)';
    }

    return text;
  }

  function createWateringDayText(plant, date) {
    const { createdAt, waterGuage } = plant;
    const createdDate = new Date(createdAt);

    const today = new Date(date);
    const watering = waterGuage.defaultGuage;
    const NumberOfElapsedDate = differenceInDays(today, createdDate);
    const passedDays = [];
    const wateringDays = [];
    let text = '';

    for (let i = 0; i < NumberOfElapsedDate; i++) {
      const passedDay = addHours(createdDate, 24 * (i + 1));

      passedDays.push(passedDay);
    }

    for (let i = 0; i < NumberOfElapsedDate / watering; i++) {
      const wateringDay = format(
        addHours(createdDate, 24 * ((i + 1) * watering)),
        'yyyy-MM-dd',
      );

      wateringDays.push(wateringDay);
    }

    if (wateringDays.includes(date)) {
      text += '- 식물의 물주기날짜입니다.';
    }

    return text;
  }

  function onButtonClick(index) {
    dispatch(selectWeekNumber(index));
  }

  return (
    <>
      <Description>
        ※ 시간여행 모드로 식물의 날짜별 상태를 확인하세요
      </Description>
      <Container>
        {isTimeTravelMode === false ? (
          <StartButton onClick={onStartButtonClick}>
            Start time traveling
          </StartButton>
        ) : (
          <>
            <StopButton onClick={onStopButtonClick}>
              Stop time traveling
            </StopButton>
            {plantsInWeek.map((plant, index) => {
              const date = format(addDays(today, index + 1), 'yyyy-MM-dd');

              return (
                <ButtonWrapper key={index}>
                  <button
                    className="date-button"
                    onClick={() => onButtonClick(index)}
                  >
                    {date}
                  </button>
                  <h3 className="info-text">
                    {createWateringDayText(plant, date)}
                    <br /> {createGrowthDayText(plant, date)}
                  </h3>
                </ButtonWrapper>
              );
            })}
          </>
        )}
      </Container>
    </>
  );
}
const Container = styled.div`
  text-align: left;
  margin-top: 0.2rem;
  position: absolute;
  top: 3rem;
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  position: absolute;
  font-size: 1em;
  font-weight: 700;
  color: ${({ theme }) => theme.baseTheme.colors.red};
  margin-left: 1rem;
`;

const StartButton = styled.button`
  width: 230px;
  height: 40px;
  background: #333;
  color: #fff;
  font-size: 1.3em;
  border: none;
  z-index: 10;
`;

const StopButton = styled.button`
  width: 230px;
  height: 40px;
  background: ${({ theme }) => theme.baseTheme.colors.red};
  color: #fff;
  font-size: 1.3em;
  border: none;
  z-index: 50;
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;

  .date-button {
    width: 230px;
    height: 40px;
    font-size: 1.2em;
    background: ${({ theme }) => theme.baseTheme.colors.gray};
    color: white;
  }

  .info-text {
    margin: 0.3rem;
    font-size: 1em;
  }
`;
