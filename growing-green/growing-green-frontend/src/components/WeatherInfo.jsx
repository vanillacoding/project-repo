import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TEMPS } from '../constants';
import { getCurrentHeight } from '../utils/getCurrentHeight';
import { getCurrentWeather } from '../redux/modules/environments';

export default function WeatherInfo({ height }) {
  const [currentHeight, setCurrentHeight] = useState(0);
  const {
    temperature,
    weather,
    iconPath,
    temperature: temp,
  } = useSelector((state) => state.environments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentWeather());
  }, [dispatch]);

  useEffect(() => {
    setCurrentHeight(getCurrentHeight(temperature, height));
  }, [temperature, height]);

  return (
    <Container height={height}>
      <BackgroundBar height={height}>
        <Bar currentHeight={currentHeight}></Bar>
      </BackgroundBar>
      <ScaleWrapper height={height}>
        {TEMPS.map((temp) => {
          return (
            <div className={`display-temp temp-${temp}`} key={temp}>
              <p>{temp}</p>
            </div>
          );
        })}
      </ScaleWrapper>
      <Weather>
        <h1 className="temp">{temp}°C</h1>
        <h3 className="weather">{weather}</h3>
        <img src={iconPath} alt="weather icon" />
      </Weather>
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 170px;
  height: ${({ height }) => `${height}px`};
  background-color: #d6d6d6;
  border-radius: 13px;
  padding: 1.2rem 0.2rem;
  margin: 6rem -1.5rem;

  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(20, 20, 20, 0.2) 3px -3px 0px inset;
`;

const ScaleWrapper = styled.div`
  position: absolute;
  width: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  display: flex;
  align-items: center;
  height: ${({ height }) => `${height}px`};

  div {
    width: 20px;
    height: ${({ height }) => `${height / 8}px`};
    border-top: 1px solid gray;
    left: -3rem;
  }

  .display-temp {
    position: relative;

    p {
      position: absolute;
      left: -1.3rem;
      top: -18px;
      font-size: 0.7em;
    }
  }

  .temp-0 {
    width: 30px;

    p {
      left: -0.8rem;
    }
  }

  .temp--30 {
    background: ${({ theme }) => theme.baseTheme.colors.red};
    height: 15px;
    width: 15px;
    border-radius: 10px;
    border: none;
    left: -3.1rem;

    p {
      left: -1.3rem;
    }
  }
`;

const BackgroundBar = styled.div`
  position: absolute;
  left: 2.4rem;
  margin-left: -5px;
  display: flex;
  align-items: flex-end;
  width: 10px;
  height: ${({ height }) => `${height}px`};
  background-color: #eaeaea;
  border-radius: 10px;
`;

const Bar = styled.div`
  width: 10px;
  height: ${({ currentHeight }) => `${currentHeight}px`};
  background-color: ${({ theme }) => theme.baseTheme.colors.red};
  border-radius: 3.5px;
  transition: 1s ease;
  transition-delay: 0.5s;
`;

const Weather = styled.div`
  width: 100px;
  position: absolute;
  right: 1rem;

  .temp {
    font-size: 1.7em;
    margin-top: 0;
  }

  .weather {
    font-size: 1.3em;
    margin: 0;
    font-weight: 200;
    margin-top: -0.3rem;
    margin-bottom: 0.3rem;
  }

  img {
    width: 70px;
  }
`;
