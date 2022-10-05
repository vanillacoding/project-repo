import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Chicken from "./Chicken";
import usePosition from "../../hooks/usePosition";
import { worldSocket } from "../../utils/socket";
import ThirdPersonCamera from "../ThirdPersonCamera";

const GUEST = "guest";

const defaultPosition = [10, -5, 150];
const defaultDirection = 0;

function UserAvatar({ ...props }) {
  const {
    position: initialPosition,
    user,
    updateOtherUsers,
    removeOtherUser,
  } = props;
  const { _id: id } = user;

  const isGuest = user.name === GUEST;
  const { positionRef, directionRef } = usePosition(initialPosition, 0, handleMovementChange, !isGuest);

  useEffect(() => {
    if (isGuest) {
      return;
    }

    worldSocket.joinWorld({
      ...user,
      position: defaultPosition,
      direction: defaultDirection,
    });

    worldSocket.listenOldUserInfo(updateOtherUsers);
    worldSocket.listenNewUserInfo(updateOtherUsers);
    worldSocket.listenUserLeave(removeOtherUser);

    return () => {
      worldSocket.leaveWorld();
      worldSocket.removeWorldListeners();
    };
  }, [user]);

  useEffect(() => {
    if (isGuest) {
      return;
    }

    function sendUserAvatarInfo({ socketId }) {
      worldSocket.sendOldUserInfo({
        userInfo: {
          ...user,
          position: positionRef.current,
          direction: directionRef.current,
        },
        receiver: socketId,
      });
    }

    worldSocket.listenNewUserSocketId(sendUserAvatarInfo);

    return () => worldSocket.removeWorldListeners();
  }, [user]);

  function handleMovementChange() {
    worldSocket.sendUserMovement({
      id,
      position: positionRef.current,
      direction: directionRef.current,
    });
  }

  return (
    <>
      <Chicken
        positionRef={positionRef}
        directionRef={directionRef}
        name={user.name}
      />
      <ThirdPersonCamera
        positionRef={positionRef}
        hasLimit={isGuest}
        handleCameraStop={isGuest && props.handleCameraStop}
      />
    </>
  );
}

UserAvatar.propTypes = {
  position: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleCameraStop: PropTypes.func,
  updateOtherUsers: PropTypes.func,
  removeOtherUser: PropTypes.func,
};

export default UserAvatar;
