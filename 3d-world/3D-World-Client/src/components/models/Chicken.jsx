import React, { Suspense, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import Texts from "./Texts";

function Chicken({ ...props }) {
  const groupRef = useRef();
  const characterRef = useRef();

  const {
    positionRef,
    directionRef,
    name,
  } = props;

  const { nodes, materials } = useGLTF("models/chicken/scene.gltf");

  const vec = useMemo(() => new THREE.Vector3());

  useFrame(() => {
    if (!groupRef.current || !characterRef.current) {
      return;
    }

    groupRef.current.position.lerp(vec.set(...positionRef.current), 0.05);
    characterRef.current.rotation.set(0, directionRef.current, 0);
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <Texts position={[-23, 60, 0]} letters={name} />
      </Suspense>
      <group
        scale={[10, 10, 10]}
        ref={characterRef}
      >
        <group
          position={[0, 3.5, 0]}
          scale={[1.96, 3.02, 1.96]}
        >
          <mesh geometry={nodes.pCube1_phong5_0.geometry} material={materials.phong5} />
          <mesh geometry={nodes.pCube1_phong2_0.geometry} material={nodes.pCube1_phong2_0.material} />
          <mesh geometry={nodes.pCube1_phong3_0.geometry} material={materials.phong3} />
          <mesh geometry={nodes.pCube1_phong4_0.geometry} material={materials.phong4} />
        </group>
        <mesh
          position={[0, 0, 0]}
          geometry={nodes.pCube2_phong2_0.geometry}
          material={nodes.pCube2_phong2_0.material}
        />
        <mesh
          position={[1.5, 0, 0]}
          geometry={nodes.pCube2_phong2_0.geometry}
          material={nodes.pCube2_phong2_0.material}
        />
      </group>
    </group>
  );
}

Chicken.propTypes = {
  positionRef: PropTypes.object,
  directionRef: PropTypes.object,
  name: PropTypes.string,
};

export default Chicken;

useGLTF.preload("models/chicken/scene.gltf");
