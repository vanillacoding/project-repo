import styled from 'styled-components';

import { flexCenter } from '../../../styles/share/common';

import Button from '../../share/Button';

function PlayAudioModal({ onClose, onPlay }) {
  const playAudio = () => {
    onPlay();
    onClose();
  };

  return (
    <Container>
      <MessageArea>
        <h1 className="message">🔉 배경음악 소리 켜기 🔉</h1>
      </MessageArea>
      <div className="button-area">
        <Button
          text="OFF"
          size="small"
          backgroundColor="lightGray"
          onClick={onClose}
        />
        <Button
          text="ON"
          size="small"
          backgroundColor="deepPink"
          onClick={playAudio}
        />
      </div>
    </Container>
  );
}

export default PlayAudioModal;

const Container = styled.div`
  height: 100%;
  font-family: 'Do Hyeon';
  text-align: center;

  .message {
    font-size: 18px;
  }

  .button-area {
    ${flexCenter}
    height: 65%;

    button {
      margin-right: 10px;
    }
  }
`;

const MessageArea = styled.div`
  ${flexCenter}
  align-items: flex-end;
  height: 35%;
`;
