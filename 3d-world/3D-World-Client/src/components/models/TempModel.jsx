import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import Texts from "./Texts";
import usePosition from "../../hooks/usePosition";
import { roomSocket } from "../../utils/socket";

function TempModel({
  isSocketReady,
  id,
  name,
  position,
}) {
  const group = useRef();
  const mesh = useRef();
  const vec = useMemo(() => new THREE.Vector3());
  const {
    positionRef,
    directionRef,
    initPosition,
  } = usePosition(position, 0, sendUserMovement);

  function sendUserMovement() {
    roomSocket.sendUserMovement({
      position: positionRef.current,
      direction: directionRef.current,
    });
  }

  useEffect(() => {
    if (!isSocketReady) return;

    function sendPosToNewUser({ socketId }) {
      roomSocket.sendOldUserInfo(
        socketId,
        {
          user: { id, name },
          position: positionRef.current,
          direction: directionRef.current,
        },
      );
    }

    roomSocket.listenNewUserSocketId(sendPosToNewUser);
    return () => initPosition();
  }, [isSocketReady]);

  useFrame(() => {
    if (!group.current) return;

    group.current.position.lerp(vec.set(...positionRef.current), 0.05);
    mesh.current.rotation.set(0, directionRef.current, 0);
  });

  return (
    <group
      ref={group}
    >
      <Suspense fallback={null}>
        <Texts letters={name} position={[-12, 45, 0]} color="#ff477e" />
      </Suspense>
      <mesh
        ref={mesh}
        position={[0, 5, 0]}
        receiveShadow
      >
        <group>
          <mesh>
            <boxBufferGeometry args={[14, 14, 20]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
          <mesh position={[0, 0, 12]}>
            <boxBufferGeometry args={[15, 15, 4]} />
            <meshStandardMaterial color="red" />
          </mesh>
          <mesh position={[0, 0, 17]}>
            <boxBufferGeometry args={[16, 16, 10]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
          <mesh position={[0, 0, 22]}>
            <boxBufferGeometry args={[4, 2, 2]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[5, -9, -8]}>
            <boxBufferGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
          <mesh position={[-5, -9, -8]}>
            <boxBufferGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
          <mesh position={[5, -9, 8]}>
            <boxBufferGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
          <mesh position={[-5, -9, 8]}>
            <boxBufferGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color="#644624" />
          </mesh>
        </group>
      </mesh>
    </group>
  );
}

TempModel.propTypes = {
  position: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  isSocketReady: PropTypes.bool,
};

TempModel.defaultProps = {
  name: "unKnown",
};

export default TempModel;
