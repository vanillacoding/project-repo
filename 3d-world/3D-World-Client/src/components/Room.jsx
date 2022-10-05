import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import RoomCanvas from "./RoomCanvas";
import { updateUserData, userFriendsSelector, userIdSelector } from "../reducers/userSlice";

const Container = styled.div`
  position: relative;
  width: 80%;
  height: 100%;
`;

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

function Room({
  roomOwnerId,
  room,
  handleClickMailbox,
  isSocketReady,
}) {
  const userId = useSelector(userIdSelector);
  const friends = useSelector(userFriendsSelector);
  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const isMyRoom = userId === roomOwnerId;
  const isFriend = friends.find((friend) => friend._id === roomOwnerId);

  async function handleAddFriendClick() {
    dispatch(updateUserData({ friend: roomOwnerId }));
  }

  return (
    <Container>
      <RoomCanvas
        isSocketReady={isSocketReady}
        room={room}
        userId={userId}
        handleClickMailbox={handleClickMailbox}
        isEditMode={isEditMode}
      />
      {isMyRoom ? (
        <Button
          type="button"
          onClick={() => setIsEditMode(((prev) => !prev))}
        >
          {isEditMode ? "리모델링 끝내기 🪑" : "리모델링 🪑"}
        </Button>
      ) : (
        <>
          {!isFriend && (
            <Button
              type="button"
              onClick={handleAddFriendClick}
            >
              일촌추가
            </Button>
          )}
        </>
      )}
    </Container>
  );
}

Room.propTypes = {
  roomOwnerId: PropTypes.string.isRequired,
  room: PropTypes.object,
  handleClickMailbox: PropTypes.func.isRequired,
  isSocketReady: PropTypes.bool,
};

export default React.memo(Room);
