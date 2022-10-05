import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WaitingArea as S } from './styles';
import { getRooms } from '../../reducers/roomsSlice';
import { getUserDataByToken } from '../../reducers/userSlice';
import PlaceListItem from '../../components/PlaceListItem';
import PlaceList from '../../components/PlaceList';
import Modal from '../../components/shared/Modal';
import CharacterSelection from '../../components/CharacterSelection';
import Header from '../../components/shared/Header';
import WelcomeImage from '../../components/WelcomeImage';

export default function WaitingArea() {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.rooms.publicRooms);
  const { isDisplay } = useSelector(state => state.modal);
  const [isFirstSelect, setIsFirstSelect] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUserDataByToken());
    }

    dispatch(getRooms());
  }, [dispatch]);

  return (
    <S.Container>
      <Header setIsFirstSelect={setIsFirstSelect}/>
      <S.WelcomeImageContainer>
        <WelcomeImage />
      </S.WelcomeImageContainer>
      <S.PlaceListContainer>
        <PlaceList>
          {rooms?.map(room => {
            return (
              <PlaceListItem room={room} key={room._id} />
            );
          })}
        </PlaceList>
      </S.PlaceListContainer>
      {isDisplay && (
        <Modal>
          <CharacterSelection isFirstSelect={isFirstSelect}/>
        </Modal>
      )}
    </S.Container>
  );
}
