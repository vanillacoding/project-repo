import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF } from "@react-three/drei";

function Mailbox({ position, onClick }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/mailbox/scene.gltf");

  return (
    <group
      ref={group}
      scale={40}
      dispose={null}
      position={[position[0], 10, position[1]]}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      <mesh
        geometry={nodes.Mailbox_0.geometry}
        material={materials.Red_Metal}
        onClick={onClick}
      />
      <mesh geometry={nodes.Mailbox_1.geometry} material={materials.Gray_Metal} />
      <mesh geometry={nodes.Letters_0.geometry} material={materials.Paper} />
    </group>
  );
}

Mailbox.propTypes = {
  position: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

Mailbox.defaultProps = {
  onClick: () => {},
};

useGLTF.preload("models/mailbox/scene.gltf");

export default Mailbox;
