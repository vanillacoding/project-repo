import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF } from "@react-three/drei";

import Chicken from "./Chicken";
import { worldSocket } from "../../utils/socket";

function OtherUserAvatar({ user }) {
  const {
    position: initialPosition,
    direction: initialDirection,
    name,
  } = user;

  const positionRef = useRef(initialPosition);
  const directionRef = useRef(initialDirection);

  function updatePosition(userInfo) {
    positionRef.current = userInfo.position;
    directionRef.current = userInfo.direction;
  }

  useEffect(() => {
    worldSocket.listenUserMovement(user._id, updatePosition);
  }, []);

  return (
    <Chicken
      positionRef={positionRef}
      directionRef={directionRef}
      name={name}
    />
  );
}

OtherUserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default OtherUserAvatar;

useGLTF.preload("models/chicken/scene.gltf");
