/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: noyou (https://sketchfab.com/zsm123)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/game-pirate-adventure-map-696dfa212fda4240817615bdccb373d0
title: Game pirate adventure map
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/adventureMap/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Take 001"].play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group name="Camera001" position={[17.69, 523.34, 928.16]} rotation={[0.18, -1.53, -0.26]} />
          <group rotation={[0, 0, 0]}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_daolu_01_hw_dixing_0.geometry}
                material={materials.hw_dixing}
              />
            </group>
          </group>
          <group position={[0, 0, 21000]} rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_peijing_04_hw_peijing_02_0.geometry}
                material={materials.hw_peijing_02}
              />
            </group>
          </group>
          <group position={[0, 0, 42000]} rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_peijing_06_hw_peijing_02_0.geometry}
                material={materials.hw_peijing_02_0}
              />
            </group>
          </group>
          <group rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_peijing_01_hw_peijing_01_0.geometry}
                material={materials.hw_peijing_01}
              />
            </group>
          </group>
          <group rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_peijing_02_hw_peijing_02_0.geometry}
                material={materials.hw_peijing_02_1}
              />
            </group>
          </group>
          <group position={[0, 0, 21000]} rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_peijing_03_hw_peijing_01_0.geometry}
                material={materials.hw_peijing_01_0}
              />
            </group>
          </group>
          <group position={[0, 0, 42000]} rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_peijing_05_hw_peijing_01_0.geometry}
                material={materials.hw_peijing_01_1}
              />
            </group>
          </group>
          <group position={[0, 0, 63000]} rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_wandaoyou_peijing_01_hw_peijing_01_0.geometry}
                material={materials.hw_peijing_01_2}
              />
            </group>
          </group>
          <group position={[0, 0, 63000]} rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_wandaoyou_peijing_02_hw_peijing_02_0.geometry}
                material={materials.hw_peijing_02_2}
              />
            </group>
          </group>
          <group position={[0, 0, 63000]} rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_wandaoyou_daolu_01_hw_dixing_0.geometry}
                material={materials.hw_dixing_0}
              />
            </group>
          </group>
          <group position={[0, 0, 21000]} rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_daolu_02_hw_dixing_0.geometry}
                material={materials.hw_dixing_1}
              />
            </group>
          </group>
          <group position={[0, 0, 42000]} rotation={[0, 0, 0]}>
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_daolu_03_hw_dixing_0.geometry}
                material={materials.hw_dixing_2}
              />
            </group>
          </group>
          <group rotation={[0, 0, 0]}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_dimian_01_hw_dixing_02_0.geometry}
                material={materials.hw_dixing_02}
              />
            </group>
          </group>
          <group position={[0, 0, 63000.03]} rotation={[0, 0, 0]}>
            <group position={[0, -0.01, -63000.03]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_wandaoyou_dimian_01_hw_dixing_02_0.geometry}
                material={materials.hw_dixing_02_0}
              />
            </group>
          </group>
          <group position={[0, 0, 42000]} rotation={[0, 0, 0]}>
            <group position={[0, -0.01, -41999.87]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_dimian_03_hw_dixing_02_0.geometry}
                material={materials.hw_dixing_02_1}
              />
            </group>
          </group>
          <group position={[0, 0, 20999.98]} rotation={[0, 0, 0]}>
            <group position={[0, 0, -20999.98]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                geometry={nodes.hw_zhidao210_dimian_02_hw_dixing_02_0.geometry}
                material={materials.hw_dixing_02_2}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/adventureMap/scene.gltf");