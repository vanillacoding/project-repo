import React from 'react';
import styled from 'styled-components';

import CommandElectionProcess from './CommandElectionProcess';
import CommandElectionResult from './CommandElectionResult';

export default function CommandElection() {
  return (
    <CommandElectionInnerBox>
      <CommandElectionResult />
      <CommandElectionProcess />
    </CommandElectionInnerBox>
  );
}

const CommandElectionInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 250px;
  border: 3px solid #a7a7a7;
`;
