/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Blendev (https://sketchfab.com/hugo859859)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/isometric-bedroom-lowpoly--528451a9f775490fbd5393ee5d5190b7
title: Isometric Bedroom - LowPoly -
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/bedroom/scene.gltf");

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.3, 3.6, 4.1]} scale={[0.32, 0.4, 0.4]}>
        <group>
          <mesh geometry={nodes.mesh_5.geometry} material={materials["Material.012"]} />
          <mesh geometry={nodes.mesh_4.geometry} material={materials["Material.022"]} />
          <mesh geometry={nodes.mesh_2.geometry} material={materials["Material.023"]} />
          <mesh geometry={nodes.mesh_3.geometry} material={materials["Material.024"]} />
          <mesh geometry={nodes.mesh_1.geometry} material={materials["Material.026"]} />
          <mesh geometry={nodes.mesh_28.geometry} material={materials["Material.016"]} />
          <mesh geometry={nodes.mesh_29.geometry} material={materials["Material.017"]} />
          <mesh geometry={nodes.mesh_27.geometry} material={materials["Material.014"]} />
          <mesh geometry={nodes.mesh_26.geometry} material={materials["Material.015"]} />
          <mesh geometry={nodes.mesh_25.geometry} material={materials["Material.021"]} />
          <mesh geometry={nodes.mesh_23.geometry} material={materials["Material.018"]} />
          <mesh geometry={nodes.mesh_24.geometry} material={materials["Material.020"]} />
          <mesh geometry={nodes.mesh_22.geometry} material={materials["Material.019"]} />
        </group>
        <group>
          <mesh geometry={nodes.mesh_14.geometry} material={materials["Material.004"]} />
          <mesh geometry={nodes.mesh_18.geometry} material={materials.Material} />
          <mesh geometry={nodes.mesh_20.geometry} material={materials["Material.002"]} />
          <mesh geometry={nodes.mesh_19.geometry} material={materials["Material.001"]} />
          <mesh geometry={nodes.mesh_21.geometry} material={materials["Material.003"]} />
          <mesh geometry={nodes.mesh_17.geometry} material={materials["Material.005"]} />
        </group>
        <group>
          <mesh geometry={nodes.mesh_15.geometry} material={materials["Material.007"]} />
          <mesh geometry={nodes.mesh_16.geometry} material={materials["Material.006"]} />
        </group>
        <group>
          <mesh geometry={nodes.mesh_9.geometry} material={materials["Material.027"]} />
          <mesh geometry={nodes.mesh_0.geometry} material={materials["Material.011"]} />
          <mesh geometry={nodes.mesh_6.geometry} material={materials["Material.029"]} />
          <mesh geometry={nodes.mesh_7.geometry} material={materials["Material.030"]} />
          <mesh geometry={nodes.mesh_8.geometry} material={materials["Material.008"]} />
          <mesh geometry={nodes.mesh_10.geometry} material={materials["Material.031"]} />
          <mesh geometry={nodes.mesh_11.geometry} material={materials["Material.032"]} />
          <mesh geometry={nodes.mesh_12.geometry} material={materials["Material.009"]} />
          <mesh geometry={nodes.mesh_13.geometry} material={materials["Material.010"]} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/bedroom/scene.gltf");