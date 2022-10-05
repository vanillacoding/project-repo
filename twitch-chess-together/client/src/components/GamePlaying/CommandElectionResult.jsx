import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectGameLatestProcess } from '../../features/game/selectors';

export default function CommandElectionResult() {
  const latestProcess = useSelector(selectGameLatestProcess);

  return (
    <CommandElectionResultInnerBox>
      {latestProcess.length ? latestProcess[0] : '아직 실행된 명령이 없음'}
    </CommandElectionResultInnerBox>
  );
}

const CommandElectionResultInnerBox = styled.div`
  margin-top: 30px;
  font-size: 30px;
`;
