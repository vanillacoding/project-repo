import React, { Suspense, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

import Speaker from "./Speaker";
import Texts from "./Texts";

export default function CarHouse({
  position,
  user,
  scale,
  onBuildingClick,
}) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/carHouse/scene.gltf");
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
        dispose={null}
        scale={scale}
        position={position}
        onClick={(e) => onBuildingClick(e, user._id)}
      >
        <group>
          <Suspense fallback={null}>
            <Texts
              scale={0.1}
              position={[-7, 10, 0]}
              letters={user.email.split("@")[0]}
            />
          </Suspense>
          <Suspense fallback={null}>
            <Speaker
              position={[4, 0, 3]}
              onClick={onSpeakerClick}
              scale={1}
            />
          </Suspense>
          <group rotation={[0, 3, 0]}>
            <mesh geometry={nodes.polySurface137_lambert2_0.geometry} material={materials.lambert2} />
            <mesh geometry={nodes.polySurface137_lambert3_0.geometry} material={materials.lambert3} />
            <mesh geometry={nodes.polySurface137_lambert1_0.geometry} material={materials.lambert1} />
            <mesh geometry={nodes.polySurface137_lambert4_0.geometry} material={materials.lambert4} />
            <mesh geometry={nodes.polySurface137_lambert5_0.geometry} material={materials.lambert5} />
            <mesh geometry={nodes.polySurface137_phong1_0.geometry} material={materials.phong1} />
            <mesh geometry={nodes.polySurface137_lambert7_0.geometry} material={materials.lambert7} />
            <mesh geometry={nodes.polySurface137_lambert6_0.geometry} material={materials.lambert6} />
            <mesh geometry={nodes.polySurface137_lambert8_0.geometry} material={materials.lambert8} />
            <mesh geometry={nodes.polySurface137_phong2_0.geometry} material={materials.phong2} />
            <mesh geometry={nodes.polySurface137_lambert11_0.geometry} material={materials.lambert11} />
            <mesh geometry={nodes.polySurface137_lambert10_0.geometry} material={materials.lambert10} />
            <mesh geometry={nodes.polySurface137_lambert12_0.geometry} material={materials.lambert12} />
            <mesh geometry={nodes.polySurface137_lambert9_0.geometry} material={materials.lambert9} />
            <mesh geometry={nodes.polySurface137_lambert13_0.geometry} material={materials.lambert13} />
            <mesh geometry={nodes.polySurface137_standardSurface1_0.geometry} material={materials.standardSurface1} />
          </group>
        </group>
      </group>
    </>
  );
}

CarHouse.propTypes = {
  position: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  scale: PropTypes.number.isRequired,
  onBuildingClick: PropTypes.func.isRequired,
};

useGLTF.preload("models/carHouse/scene.gltf");
