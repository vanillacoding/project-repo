import socketIOClient from 'socket.io-client';

export let socket;

export const connectSocket = (deviceAddress) => {
  socket = socketIOClient(`http://loca-chat.ap-northeast-2.elasticbeanstalk.com/`);
};
