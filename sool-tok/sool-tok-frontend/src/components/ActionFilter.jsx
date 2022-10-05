import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { roomSocket } from '../utils/socket';

function ActionFilter({ roomId, isFilterOn }) {
  const emojiList = ['🤮', '🍺', '❤️', '🤔'];

  const filterOn = ev => {
    const { value } = ev.target;

    roomSocket.renderFilter({ roomId, isFilterOn: true, filter: value });
  };

  const filterOff = () => {
    roomSocket.renderFilter({ roomId, isFilterOn: false, filter: null });
  };

  return (
    <ActionIconBox>
      {isFilterOn ?
        <ActionIconButton onClick={filterOff}>❌</ActionIconButton>
        :
        <>
          {emojiList.map((emoji, i) => (
            <ActionIconButton key={i} onClick={filterOn} value={emoji}>
              {emoji}
            </ActionIconButton>
          ))}
        </>
      }
    </ActionIconBox>
  );
}

const ActionIconBox = styled.div`
  z-index: 999;
  width: 180px;
  height: 60px;
  position: absolute;
  bottom: 24px;
  left: 32px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.darkPurple};
`;

const ActionIconButton = styled.button`
  font-size: 25px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default ActionFilter;

ActionFilter.propTypes = {
  roomId: PropTypes.string.isRequired,
  isFilterOn: PropTypes.bool.isRequired,
};
