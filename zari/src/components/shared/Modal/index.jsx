import React from 'react';
import ReactDOM from 'react-dom';

import { Modal as S } from './styles';

export default function Modal({ children, title }) {
  return ReactDOM.createPortal(
    <>
      <S.Background/>
      <S.Container>
        <S.Content>
          <S.Title>{title}</S.Title>
          {children}
        </S.Content>
      </S.Container>
    </>,
    document.getElementById('modal'),
  );
}
