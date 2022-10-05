import React from 'react';
import { useSelector } from 'react-redux';
import { Circle } from 'react-feather';

import { UserProfile as S } from './styles';

export default function UserProfile() {
  const user = useSelector(state => state.user.data);

  return (
    <S.Container>
      <S.TextContainer>
        <S.Text>
          {user?.name}
        </S.Text>
      </S.TextContainer>
      <S.TextContainer>
        <Circle color="#18c747" fill="#18c747" size={9} height="100%"/>
        <S.OnlineText>
          Online
        </S.OnlineText>
      </S.TextContainer>
    </S.Container>
  );
}
