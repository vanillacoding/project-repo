import React, { Suspense, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

import Texts from "./Texts";
import Speaker from "./Speaker";

export default function Model({
  user,
  position,
  onBuildingClick,
}) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/building/scene.gltf");
  const [isMusicOn, setIsMusicOn] = useState(false);

  function onSpeakerClick(e) {
    e.stopPropagation();
    setIsMusicOn((prev) => !prev);
  }

  return (
    <>
      <Html>
        <ReactPlayer
          url={user.musicURL}
          playing={isMusicOn}
          width={0}
          height={0}
        />
      </Html>
      <group
        ref={group}
        position={position}
        dispose={null}
        scale={[0.08, 0.08, 0.08]}
        onClick={(e) => onBuildingClick(e, user._id)}
      >
        <Suspense fallback={null}>
          <Texts
            scale={15}
            position={[-300, 3500, 500]}
            letters={user.email.split("@")[0]}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Speaker
            position={[1000, 400, 1000]}
            onClick={onSpeakerClick}
            scale={300}
          />
        </Suspense>
        <group rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <mesh geometry={nodes.mesh_0.geometry} material={materials.material_2} />
          <mesh geometry={nodes.mesh_1.geometry} material={materials.material_8} />
          <mesh geometry={nodes.mesh_2.geometry} material={materials.material_9} />
          <mesh geometry={nodes.mesh_3.geometry} material={materials.default} />
          <mesh geometry={nodes.mesh_4.geometry} material={nodes.mesh_4.material} />
          <mesh geometry={nodes.mesh_5.geometry} material={nodes.mesh_5.material} />
          <mesh geometry={nodes.mesh_6.geometry} material={nodes.mesh_6.material} />
          <mesh geometry={nodes.mesh_7.geometry} material={nodes.mesh_7.material} />
          <mesh geometry={nodes.mesh_8.geometry} material={nodes.mesh_8.material} />
          <mesh geometry={nodes.mesh_9.geometry} material={materials.material_5} />
          <mesh geometry={nodes.mesh_10.geometry} material={materials.material_6} />
          <mesh geometry={nodes.mesh_11.geometry} material={materials.material_7} />
          <mesh geometry={nodes.mesh_12.geometry} material={materials.material_10} />
          <mesh geometry={nodes.mesh_13.geometry} material={materials.material_11} />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("models/building/scene.gltf");

Model.propTypes = {
  position: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onBuildingClick: PropTypes.func.isRequired,
};
