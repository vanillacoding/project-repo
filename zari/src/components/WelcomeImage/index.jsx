import React from 'react';

import { WelcomeImage as S } from './styles';
import { homeBackground } from '../../images';

export default function WelcomeImage() {
  return (
    <S.Container>
      <S.Background src={homeBackground} />
      <S.TitleContainer>
        <S.Title>
          The Zari
        </S.Title>
      </S.TitleContainer>
    </S.Container>
  );
}
