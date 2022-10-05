import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import GameRoom from './GameRoom';
import { setRoute } from '../reducer/route';
import PropTypes from 'prop-types';
import styles from './GameList.module.scss';

const Address = ({ address }) => {
  return (
    <div className={styles.addressContainer}>
      <p>바로 지금 여기</p>
      <h4>{address}</h4>
      <p>에서 방탈출할 사람✋</p>
    </div>
  );
};

const GameList = ({
  gameList,
  playingGameList,
  setTarget,
  joinWaitingRoom,
  address,
}) => {
  const dispatch = useDispatch();
  const [ isSelected, setIsSelected ] = useState(true);
  const [ playingGameData, setPlayingGameData ] = useState([]);
  const handleFilter = () => setIsSelected(!isSelected);

  useEffect(() => {
    const temp = {};
    playingGameList.forEach((game) => {
      temp[game._id] = {
        users: game.users,
        isPlaying: game.isPlaying,
      };
    });

    setPlayingGameData(temp);
  }, [playingGameList]);

  return (
    <div className={styles.container}>
      <Address address={address} />
      <Button
        className='toggleButton'
        text={isSelected ? 'All' : 'Waiting'}
        onClick={handleFilter}
      />
      <div className={styles.gameContainer}>
        {
          !gameList.length
            ? <div className={styles.noRoomMessage}>
                <p>방 없음🤐</p>
              </div>
            : (
                isSelected
                  ? gameList
                  : gameList = gameList.reduce((acc, cur) => {
                      if (!playingGameData[cur._id]?.isPlaying) acc.push(cur);
                      return acc;
                    }, [])
              ).map((game, index) => {
                const lastGame = index === gameList.length - 1;
                const data = playingGameData[game?._id];

                return (
                  <GameRoom
                    key={game._id}
                    id={game._id}
                    isPlaying={data ? data.isPlaying : false}
                    name={game.name || game.gameInfo.name}
                    setTarget={lastGame ? setTarget : null}
                    userCount={data ? data.users.length : 0}
                    joinWaitingRoom={joinWaitingRoom}
                  />
                );
              })
        }
      </div>
      <Button
        className='fixedButton'
        text='방 만들기'
        onClick={() => dispatch(setRoute('/games/new'))}
      />
    </div>
  );
};

Address.propTypes = {
  address: PropTypes.string.isRequired,
};

GameList.propTypes = {
  gameList: PropTypes.array.isRequired,
  playingGameList: PropTypes.array.isRequired,
  setTarget: PropTypes.func.isRequired,
  joinWaitingRoom: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};

export default GameList;
