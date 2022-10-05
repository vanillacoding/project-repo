import React, { Suspense, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Universe from "./models/Universe";
import TempModel from "./models/TempModel";
import Mailbox from "./models/Mailbox";
import Bedroom from "./models/Bedroom";

import Friends from "./Friends";
import RoomFurniture from "./RoomFurniture";
import { userNameSelector } from "../reducers/userSlice";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
  };
  & div{
    border-radius: 8px;
  };
`;

function RoomCanvas({
  isSocketReady,
  userId,
  room,
  handleClickMailbox,
  isEditMode,
}) {
  const userName = useSelector(userNameSelector);
  const dispatch = useDispatch();
  const canvasRef = useRef();

  function ControlCam() {
    useFrame(({ camera }) => {
      camera.lookAt(2 * 40, 0, 2 * 40);
    });

    return null;
  }

  function handleClickCanvas() {
    canvasRef.current.focus();
  }
  // TODO: delete temp model
  return (
    <CanvasContainer
      onClick={handleClickCanvas}
      ref={canvasRef}
      tabIndex={0}
    >
      <Canvas
        orthographic
        camera={{ position: [400, 350, 400], zoom: 1.2 }}
      >
        <Universe
          position={[6 * 40, 0, 6 * 40]}
          radius={400}
        />
        <ambientLight intensity={1.5} />
        <pointLight intensity={0.5} position={[4 * 40, 6 * 40, 4 * 40]} />
        <pointLight intensity={0.5} position={[8 * 40, 6 * 40, 8 * 40]} />
        <TempModel
          isSocketReady={isSocketReady}
          name={userName}
          id={userId}
          position={[2 * 40, 24, 0 * 40]}
        />
        <Friends isSocketReady={isSocketReady} />
        <Suspense fallback={null}>
          <Mailbox
            position={[3 * 40, 13 * 40]}
            onClick={() => handleClickMailbox(room.mailboxId)}
          />
          <RoomFurniture
            isSocketReady={isSocketReady}
            isEditMode={isEditMode}
            room={room}
            dispatch={dispatch}
          />
          <Bedroom receiveShadow scale={4 * 12} position={[0, 20, 0]} />
        </Suspense>
        {/* NOTE: OrbitControls 삭제하고 view 고정해야함 */}
        <OrbitControls />
        <ControlCam />
      </Canvas>
    </CanvasContainer>
  );
}

RoomCanvas.propTypes = {
  isSocketReady: PropTypes.bool,
  userId: PropTypes.string,
  room: PropTypes.any,
  handleClickMailbox: PropTypes.func,
  isEditMode: PropTypes.bool,
};

export default RoomCanvas;
