import React from 'react';
import { useHistory } from 'react-router-dom';

import { ExitButton as S } from './styles';

export default function ExitButton() {
  const history = useHistory();

  function handleExitButtonClick() {
    history.push('/waitingarea');
  }

  return (
    <S.Container>
      <S.ExitBtn
        size={48}
        onClick={handleExitButtonClick}
      />
    </S.Container>
  );
}
