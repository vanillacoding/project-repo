import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectChatServerCommands } from '../../features/chatServer/selectors';
import { selectChessMyTurnSequence } from '../../features/chess/selectors';

import NotMyTurn from './NotMyTurn';

export default function CommandList() {
  const commandList = useSelector(selectChatServerCommands);
  const myTurnSequence = useSelector(selectChessMyTurnSequence);

  return (
    <CommandListInnerBox>
      {myTurnSequence ? (
        commandList.map((commandInfo) => {
          if (!commandInfo.id)
            return <Empty key={`EmptyCommand${commandInfo}`} />;
          const { id, author, command, content } = commandInfo;
          return (
            <Command key={id}>
              <CommandContent>{`${author}:  ${command} ${content}`}</CommandContent>
            </Command>
          );
        })
      ) : (
        <NotMyTurn />
      )}
    </CommandListInnerBox>
  );
}

const Empty = styled.div`
  height: 40px;
`;

const CommandListInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: baseline;
  width: 350px;
  height: 400px;
  border: 3px solid #a7a7a7;
`;

const Command = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 330px;
  height: 40px;
`;

const CommandContent = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  width: 250px;
  height: 30px;
  color: white;
  font-size: 20px;
`;
