import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

function Tag({ position, args }) {
  const mesh = useRef(null);

  useFrame(() => {
    if (!mesh.current) return;

    mesh.current.rotation.y += 0.02;
  });

  return (
    <mesh
      receiveShadow
      ref={mesh}
      scale={1}
      position={position}
      rotateX={Math.PI / 2}
    >
      <octahedronBufferGeometry args={args} />
      <meshStandardMaterial
        attach="material"
        color="#ff0a54"
      />
    </mesh>
  );
}

Tag.propTypes = {
  position: PropTypes.array,
  args: PropTypes.array,
};

export default Tag;
