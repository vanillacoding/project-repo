import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getAllPlantsByUserId } from '../redux/modules/plants';

import WeatherInfo from '../components/WeatherInfo';
import Calendar from '../components/Calendar';
import PlantCanvas from '../components/PlantCanvas';
import TimeTravelCanvas from '../components/TimeTravelCanvas';
import ErrorBox from '../components/ErrorBox';
import Loading from '../components/Loading';
import TimeTravelMode from '../components/TimeTravelMode';

import newPlantIcon from '../assets/images/background/new_plant_icon.png';
import backButton from '../assets/images/arrows/back_arrow.png';

export default function PlantPage() {
  const { allPlants, isLoading, error } = useSelector((state) => state.plants);
  const { isTimeTravelMode, plantsInWeek } = useSelector(
    (state) => state.timeTravel,
  );

  const { plantId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const plantIds = Object.keys(allPlants);
  const currentIndex = plantIds.indexOf(plantId);
  const plants = Object.values(allPlants);

  useEffect(() => {
    dispatch(getAllPlantsByUserId());
  }, [dispatch, plantId]);

  function renderError() {
    return <ErrorBox message={error} />;
  }

  function renderLoading() {
    return <Loading text="식물정보 불러오는중..." />;
  }

  function renderPage() {
    return (
      <>
        <TimeTravelMode />
        {isTimeTravelMode === true ? (
          <TimeTravelCanvas
            plantsInWeek={plantsInWeek}
            isTimeTravelMode={isTimeTravelMode}
          />
        ) : (
          <>
            <CalendarAndWeather>
              <Calendar />
              <WeatherInfo height="120" temperature="30" icon />
            </CalendarAndWeather>
            <PlantCanvas plants={plants} isTimeTravelMode={isTimeTravelMode} />
            <NewPlantButtonWrapper>
              <NewPlantButton onClick={() => history.push('/create')} />
            </NewPlantButtonWrapper>
            <BackButton onClick={() => history.push('/')} />
          </>
        )}
      </>
    );
  }

  return (
    <Container>
      {error ? renderError() : isLoading ? renderLoading() : renderPage()}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 1200px;
  height: 700px;
`;

const CalendarAndWeather = styled.div`
  position: absolute;
  align-items: center;
  left: 4rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
`;

const LeftArrow = styled.img`
  position: absolute;
  left: 8rem;
  top: 14rem;
  width: 150px;
`;

const RightArrow = styled.img`
  position: absolute;
  right: 8rem;
  top: 14rem;
  width: 150px;
`;

const NewPlantButtonWrapper = styled.div`
  position: absolute;
  right: 4.5rem;
  top: 6rem;
  width: 115px;
  height: 115px;
  background: #a9cf98;
  border-radius: 100px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(20, 20, 20, 0.2) 3px -3px 0px inset;
`;

const NewPlantButton = styled.button`
  background: url(${newPlantIcon});
  background-size: cover;
  position: absolute;
  right: -14px;
  top: -14px;
  width: 150px;
  height: 170px;
  border: none;
`;

const BackButton = styled.button`
  width: 74px;
  height: 50px;
  position: absolute;
  left: 2.5rem;
  border: none;
  bottom: 1rem;
  background: url(${backButton}) no-repeat;
  background-size: cover;
`;
