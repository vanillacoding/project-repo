import React, { Suspense, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import Texts from "./Texts";

function TempFriendModel({ name, position, direction }) {
  const group = useRef();
  const mesh = useRef();
  const vec = useMemo(() => new THREE.Vector3());

  useFrame(() => {
    if (!group.current) {
      return;
    }

    group.current.position.lerp(vec.set(...position), 0.05);
  });

  return (
    <group
      ref={group}
    >
      <Suspense fallback={null}>
        <Texts letters={name} position={[-12, 45, 0]} color="#00f5d4" />
      </Suspense>
      <mesh
        ref={mesh}
        rotation={[0, direction, 0]}
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

TempFriendModel.propTypes = {
  position: PropTypes.array.isRequired,
  direction: PropTypes.number.isRequired,
  name: PropTypes.string,
};

TempFriendModel.defaultProps = {
  name: "unKnown",
};

export default TempFriendModel;
