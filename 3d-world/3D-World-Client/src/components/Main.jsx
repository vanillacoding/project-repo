import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import MyProfile from "./MyProfile";
import Room from "./Room";
import OtherUserProfile from "./OtherUserProfile";
import { userIdSelector, userNameSelector } from "../reducers/userSlice";
import useMailbox from "../hooks/useMailbox";
import MailboxModal from "./MailboxModal";
import Chat from "./Chat";
import { getRoomById, roomSelector } from "../reducers/roomSlice";
import { roomSocket } from "../utils/socket";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: auto;
  padding: 1rem;
  border-radius: 8px;
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  max-width: 250px;
  height: 100%;
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.cardBorder.color};
  background-color: ${(props) => props.theme.cardBg.color};
`;

// NOTE: 내 방을 가던 남의 방을 가던 /room/:id 로 온다.
function Main() {
  const { userId: roomOwnerId } = useParams();

  const dispatch = useDispatch();

  const room = useSelector(roomSelector);
  const userName = useSelector(userNameSelector);
  const loggedInUserId = useSelector(userIdSelector);

  const isLoggedInUser = loggedInUserId === roomOwnerId;
  const isSocketReady = roomOwnerId === room?.ownerId;
  const user = { id: loggedInUserId, name: userName };

  const {
    mailboxId,
    isToggled,
    toggle,
    memoHandleClickMailbox,
  } = useMailbox(isLoggedInUser);

  useEffect(() => {
    if (roomOwnerId !== room?.ownerId) {
      dispatch(getRoomById(roomOwnerId));
      return;
    }

    roomSocket.joinRoom({ user, roomId: room._id });
    return () => {
      roomSocket.leaveRoom();
      roomSocket.removeAllRoomListeners();
    };
  }, [roomOwnerId, room]);

  return (
    <Container>
      <SideContainer>
        {isLoggedInUser ? (
          <MyProfile />
        ) : (
          <OtherUserProfile id={roomOwnerId} />
        )}
        <Chat isSocketReady={isSocketReady} />
      </SideContainer>
      <>
        <Room
          roomOwnerId={roomOwnerId}
          room={room}
          isSocketReady={isSocketReady}
          handleClickMailbox={memoHandleClickMailbox}
        />
        {isToggled && (
          <MailboxModal
            toggle={toggle}
            mailboxId={mailboxId}
            isMyMailbox={isLoggedInUser}
          />
        )}
      </>
    </Container>
  );
}

export default Main;
