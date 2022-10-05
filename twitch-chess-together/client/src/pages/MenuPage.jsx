/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { initLogout } from '../features/user/slices';
import { selectUser } from '../features/user/selectors';
import Button from '../components/common/Button';
import Background from '../components/common/Background';
import PlayerProfileImage from '../components/GamePlaying/PlayerProfileImage';
import PlayerProfileDisplayName from '../components/GamePlaying/PlayerProfileDisplayName';

export default function MenuPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const logOut = () => {
    dispatch(initLogout());
    history.push('/');
  };

  const moveToGameMakingPage = () => {
    history.push('/game/making');
  };

  const moveToGameJoiningPage = () => {
    history.push('/game/joining');
  };

  return (
    <Background>
      <LayOut>
        <UserInfo>
          <PlayerProfileImage imgUrl={user.profileImageUrl} size={400} />
          <PlayerProfileDisplayName displayName={user.displayName} size={90} />
        </UserInfo>
        <ButtonList>
          <Button width={550} height={150} handleClick={moveToGameMakingPage}>
            <ButtonText>방만들기</ButtonText>
          </Button>
          <Button width={550} height={150} handleClick={moveToGameJoiningPage}>
            <ButtonText>참가</ButtonText>
          </Button>
          <Button width={550} height={150} handleClick={logOut}>
            <ButtonText>로그아웃</ButtonText>
          </Button>
        </ButtonList>
      </LayOut>
    </Background>
  );
}

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 700px;
  width: 700px;
  margin-top: 50px;
  border: 3px solid #a7a7a7;
  font-size: 30px;
`;

const LayOut = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ButtonText = styled.div`
  font-size: 80px;
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 800px;
  width: 600px;
`;
