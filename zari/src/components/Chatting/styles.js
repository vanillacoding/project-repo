import styled from 'styled-components';
import { MessageCircle } from 'react-feather';

export const Chatting = {};

Chatting.ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 30px;
`;

Chatting.ChatButton = styled(MessageCircle)`
  cursor: pointer;
`;

Chatting.ChatContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: ${props => props.toggled === true ? '0' : '-500px'};
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 500px;
  margin-right: 30px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  transition: all .5s;
`;

Chatting.ChatTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
  display: none;
  }
`;

Chatting.TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

Chatting.TextItem = styled.div`
  margin-bottom: 5px;
`;

Chatting.UserNickname = styled.span`
  color: burlywood;
`;

Chatting.Text = styled.span`
  color: white;
`;

Chatting.ChatInputForm = styled.form`
  display: flex;
  flex-direction: column;
`;

Chatting.Input = styled.input`
  margin: 10px;
  padding: 5px;
  border-radius: 5px;


  &:focus {
    outline: none;
  }
`;
