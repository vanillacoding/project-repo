import React from 'react';

import { PlaceList as S } from './styles';

export default function PlaceList({ children }) {
  return (
    <S.Container>
      {children}
    </S.Container>
  );
}
