import React, { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import ChildFurniture from "./ChildFurniture";

function Furniture({
  name,
  position,
  isEditMode,
  onClick,
}) {
  const group = useRef();
  const mesh = useRef();
  const vec = useMemo(() => new THREE.Vector3());

  useFrame(() => {
    if (!group.current) return;

    group.current.position.lerp(vec.set(...position), 0.3);
  });

  return (
    <group ref={group}>
      <mesh
        ref={mesh}
        rotation={[0, 0, 0]}
        onClick={onClick}
      >
        <ChildFurniture name={name} isEditMode={isEditMode} />
      </mesh>
    </group>
  );
}

Furniture.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.array,
  isEditMode: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Furniture;
