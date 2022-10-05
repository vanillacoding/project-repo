import React from "react";
import { RepeatWrapping, TextureLoader } from "three";

import grassImg from "./textures/grass.jpeg";

export default function GreenFloor() {
  const texture = new TextureLoader().load(grassImg);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(240, 240);

  return (
    <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={[210, 1400]} />
      <meshStandardMaterial map={texture} attach="material" color="green" />
    </mesh>
  );
}
