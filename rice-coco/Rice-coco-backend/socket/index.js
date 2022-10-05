const socketIo = require('socket.io');
const meetingService = require('../services/meetingService');
const meetingList = {};

const initSocket = server => {
  const io = socketIo(server);

  io.on('connection', socket => {
    socket.on('create meeting', async ({ meetingId, userId }) => {
      const currentMeeting = {
        meetingId,
        users: [userId],
        arrivalCount: 0,
      };

      meetingList[meetingId] = currentMeeting;

      socket.meetingId = meetingId;
      socket.join(meetingId);
    });

    socket.on('join meeting', async ({ meetingId, userId }) => {
      const currentMeeting = meetingList[meetingId];
      const isUserIn = currentMeeting.users.includes(userId);

      socket.meetingId = meetingId;
      socket.join(meetingId);

      if (isUserIn) return;

      currentMeeting.users.push(userId);

      try {
        await meetingService.joinMeeting(meetingId, userId);
      } catch (error) {
        console.error(error);
      }

      io.to(meetingId).emit('partner join meeting', {
        meetingData: currentMeeting,
        partnerId: userId,
      });
    });

    socket.on('send message', async ({ userId, nickname, message }, callback) => {
        await meetingService.updateChat(
          socket.meetingId,
          userId,
          nickname,
          message
        );

        io.emit('message', { userId, nickname, message });
        callback();
      }
    );

    socket.on('send location', async ({ location }) => {
      socket.broadcast
        .to(socket.meetingId)
        .emit('get partner location', location);
    });

    // 미팅 성사 전, 유저가 취소 버튼을 눌렀을 때의 이벤트
    socket.on('cancel meeting', async callback => {
      const { meetingId } = socket;

      try {
        await meetingService.deleteMeeting(meetingId);
        delete meetingList[meetingId];

        socket.leave(meetingId);
        callback();
      } catch (error) {
        console.error(error);
      }
    });

    // 미팅 성사 후, 한 유저가 일방적으로 취소 버튼을 눌렀을 때의 이벤트
    socket.on('breakup meeting', async callback => {
      const { meetingId } = socket;

      try {
        await meetingService.deleteMeeting(meetingId);
        delete meetingList[meetingId];

        socket.broadcast.to(meetingId).emit('canceled by partner');
        socket.leave(meetingId);
        callback();
      } catch (error) {
        console.error(error);
      }
    });

    // 미팅 성사 후, 아무도 취소 버튼을 누르지 않고 무사히 미팅이 종료된 경우
    socket.on('finish meeting', async callback => {
      const { meetingId } = socket;

      try {
        await meetingService.finishMeeting(meetingId);
        delete meetingList[meetingId];

        socket.leave(meetingId);
        callback();
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('arrive meeting', () => {
      const { meetingId } = socket;
      const currentMeeting = meetingList[meetingId];

      currentMeeting.arrivalCount++;
      io.to(meetingId).emit('change current meeting', currentMeeting);
    });
  });
};

module.exports = initSocket;
