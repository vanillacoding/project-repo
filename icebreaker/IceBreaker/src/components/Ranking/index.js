import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getDatabase, ref, get, child } from '@firebase/database';
import { GiBearFace } from 'react-icons/gi';
import styled from 'styled-components';
import useSound from 'use-sound';

import { flexCenter } from '../../styles/share/common';
import { smallPounding } from '../../styles/share/animation';
import { ROUTE, RANKERS } from '../../constants/game';
import { ERROR } from '../../constants/error';

import Button from '../share/Button';
import BarSpinner from '../share/LoadingSpinner/BarSpinner';

function Ranking() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [rankers, setRankers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [play] = useSound('/audio/click.mp3');

  useEffect(() => {
    const getRanks = async () => {
      try {
        const rankingData = (
          await get(child(ref(getDatabase()), RANKERS))
        ).val();

        if (!rankingData) return setLoading(true);

        const rankerList = Object.values(rankingData);
        rankerList.sort((a, b) => b.score - a.score);
        setRankers(rankerList);
        setLoading(true);
      } catch (err) {
        history.push(ROUTE.ERROR, {
          error: ERROR.LOAD_DATA,
        });
      }
    };

    getRanks();
  }, [dispatch, history]);

  return (
    <Container>
      <TitleWrapper>
        <h1 className="title">BREAKER RANKS</h1>
      </TitleWrapper>
      <Rankers>
        <div className="list-option">
          <span className="ranking">순위</span>
          <span className="name">닉네임</span>
          <span className="score">점수</span>
        </div>
        {loading ? (
          rankers ? (
            Object.values(rankers).map((ranker, i) => (
              <Ranker key={ranker.name} className={i < 3 && `rank${i + 1}`}>
                {i < 3 && <GiBearFace className={`medal${i + 1}`} />}
                <span className="user-ranking">{i + 1}</span>
                <span className="user-name">{ranker.name}</span>
                <span className="user-score">{ranker.score}</span>
              </Ranker>
            ))
          ) : null
        ) : (
          <BarSpinner color="white" />
        )}
      </Rankers>
      <ButtonArea>
        <Link to={ROUTE.MENU}>
          <Button
            text="처음으로"
            backgroundColor="purple"
            size="large"
            onClick={play}
          />
        </Link>
      </ButtonArea>
    </Container>
  );
}

export default Ranking;

const Container = styled.div`
  height: 100%;
  text-align: center;
  background-image: url(/background/ranks.png);
`;

const TitleWrapper = styled.div`
  ${flexCenter}
  align-items: flex-end;
  height: 34%;
  padding-bottom: 15px;
  text-align: center;

  .title {
    width: 100%;
    text-align: center;
    font-size: 26px;
    color: ${({ theme }) => theme.white};
    -webkit-text-stroke: 2px ${({ theme }) => theme.deepGray};
  }
`;

const Rankers = styled.div`
  height: 48%;
  width: 100%;
  text-align: center;
  overflow-y: auto;
  font-family: 'Do hyeon';

  .list-option {
    width: 77%;
    height: 30px;
    margin: 10px auto 0 auto;
    border-radius: 20px;
    border: 3px solid ${({ theme }) => theme.lightGray};
    border-radius: 20px;
    border-style: dashed;

    .ranking,
    .name,
    .score {
      display: inline-block;
      width: 33%;
      height: 30px;
      font-size: 17px;
      line-height: 25px;
      color: ${({ theme }) => theme.white};
    }
  }

  &::-webkit-scrollbar {
    width: 9px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.lightGray};

    &:hover {
      background-color: ${({ theme }) => theme.white};
      border: none;
    }
  }
`;

const Ranker = styled.div`
  position: relative;
  width: 77%;
  height: 40px;
  margin: 10px auto 0 auto;
  border-radius: 20px;
  border: 3px solid ${({ theme }) => theme.white};
  border-radius: 20px;
  border-style: dashed;
  background-color: ${({ theme }) => theme.orange};
  color: ${({ theme }) => theme.deepGray};

  .user-ranking,
  .user-name,
  .user-score {
    display: inline-block;
    width: 33%;
    height: 30px;
    font-size: 20px;
    line-height: 35px;
  }

  &.rank1 {
    background-color: ${({ theme }) => theme.pink};
    color: ${({ theme }) => theme.white};
    animation: ${smallPounding} 1.2s infinite;
  }

  &.rank2 {
    background-color: ${({ theme }) => theme.pink};
    color: ${({ theme }) => theme.white};
    animation: ${smallPounding} 1.2s infinite;
  }

  &.rank3 {
    background-color: ${({ theme }) => theme.pink};
    color: ${({ theme }) => theme.white};
    animation: ${smallPounding} 1.2s infinite;
  }

  .medal1,
  .medal2,
  .medal3 {
    position: absolute;
    top: 5px;
    left: -10px;
    border: 2px solid ${({ theme }) => theme.white};
    border-radius: 10px;
    font-size: 25px;
  }

  .medal1 {
    background-color: ${({ theme }) => theme.yellow};
    color: ${({ theme }) => theme.deepGray};
  }

  .medal2 {
    background-color: #a3cefa;
    color: ${({ theme }) => theme.deepGray};
  }

  .medal3 {
    background-color: #e0d6d6;
    color: ${({ theme }) => theme.deepGray};
  }
`;

const ButtonArea = styled.div`
  ${flexCenter}
  height: 18%;
`;
