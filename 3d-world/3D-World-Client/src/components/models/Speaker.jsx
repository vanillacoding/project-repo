import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Speaker(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/speaker/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <mesh geometry={nodes.export_notes001_bake_notes_0.geometry} material={materials.bake_notes} />
        <mesh geometry={nodes.export_notes001_bake_rim_0.geometry} material={materials.bake_rim} />
        <mesh geometry={nodes.export_notes001_bake_base_0.geometry} material={materials.bake_base} />
        <mesh geometry={nodes.export_notes001_bake_mesh_0.geometry} material={materials.bake_mesh} />
        <mesh geometry={nodes.export_notes001_bake_buttons_0.geometry} material={materials.bake_buttons} />
      </group>
    </group>
  );
}

useGLTF.preload("models/speaker/scene.gltf");
