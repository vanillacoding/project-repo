import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';

import * as colors from '../../lib/colors';

const Chatting = ({
  message,
  setMessage,
  onSendButtonClick,
  children
}) => (
  <Wrapper>
    <ScrollToBottom className={ScrollBarCss}>
      {children.map(msg => (
        <MessageWrapper key={msg.message + Date.now()}>
          <User>{msg.username}</User>
          <Message>{msg.message}</Message>
        </MessageWrapper>
      ))}
    </ScrollToBottom>
    <InputForm>
      <input
        type='text'
        placeholder='Type messages..'
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={e => onSendButtonClick(e, message)}>Send</button>
    </InputForm>
  </Wrapper>
);

const ScrollBarCss = css({
  height: '93%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  padding: '1rem'
});

const Wrapper = styled.div`
  height: 40rem;
  width: 55rem;
  margin: 0 1.5rem;
`;

const InputForm = styled.form`
  display: flex;
  justify-content: space-between;

  input {
    width: 85%;
    padding: 0 1rem;
    font-size: 1.5rem;
  }

  button {
    width: 15%;
    background-color: ${colors.CHAT_SUBMIT_BUTTON_COLOR};
    color: white;
    font-size: 2rem;
  }
`;

const MessageWrapper = styled.div`
  margin: 0.3rem 0;
  display: flex;
  justify-content: flex-start;
`;

const User = styled.p`
  min-width: 15%;
  height: 2rem;
  font-size: 1.5rem;
  text-align: left;
  font-weight: bold;
  color: ${colors.GAME_HIGHLIGHT_COLOR};
`;

const Message = styled.p`
  width: 80%;
  height: 2rem;
  font-size: 1.5rem;
  text-align: left;
`;

Chatting.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  onSendButtonClick: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
};

export default Chatting;
