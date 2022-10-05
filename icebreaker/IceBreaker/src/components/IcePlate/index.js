import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, Image } from 'react-konva';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { changeGameStatus } from '../../store/quizSlice';
import { GAME_STATUS } from '../../constants/game';

import PlateLayer from '../Ice/PlateLayer';
import Cubes from '../Ice/Cubes';
import LoadingPlateLayer from '../Ice/LoadingPlateLayer';

function IcePlate({ selectedAudio }) {
  const dispatch = useDispatch();
  const quizCollection = useSelector((state) => state.quiz?.quizCollection);
  const currentQuizIndex = useSelector((state) => state.quiz?.currentQuizIndex);
  const currentQuizId = quizCollection.allIds[currentQuizIndex];
  const currentQuiz = quizCollection.byId[currentQuizId];
  const gameStatus = useSelector((state) => state.quiz?.gameStatus);
  const [image, setImage] = useState(null);
  const { imgUrl } = currentQuiz;

  useEffect(() => {
    const img = new window.Image();
    img.src = imgUrl;
    img.onload = () => {
      setImage(img);
      if (selectedAudio) {
        dispatch(changeGameStatus(GAME_STATUS.ICE_BREAKING_TIME));
      }
    };
  }, [imgUrl, dispatch, selectedAudio]);

  return (
    <Container>
      {gameStatus !== GAME_STATUS.BEFORE_START ? (
        <Stage width={375} height={400}>
          <PlateLayer />
          <Layer>
            <Image x={90} y={105} image={image} width={195} height={195} />
          </Layer>
          <Layer>
            <Cubes
              level={currentQuizIndex + 1}
              isAnswerTime={gameStatus === GAME_STATUS.ANSWER_GUESS_TIME}
            />
          </Layer>
        </Stage>
      ) : (
        <Stage width={375} height={400}>
          <LoadingPlateLayer />
        </Stage>
      )}
    </Container>
  );
}

export default IcePlate;

IcePlate.propTypes = {
  selectedAudio: PropTypes.bool,
};

const Container = styled.div`
  height: 50%;
`;
