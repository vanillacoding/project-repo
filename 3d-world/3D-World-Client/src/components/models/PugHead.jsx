/* eslint-disable react/prop-types */
// TODO: prop types
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function PugHead(props) {
  const { position, direction } = props;
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/pugHead.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Run.play();
  }, []);

  return (
    <group
      ref={group}
      dispose={null}
      position={[...position].map((each) => each + 20)}
      rotation={[0, direction, 0]}
    >
      <primitive object={nodes.Bone} />
      <skinnedMesh geometry={nodes.Cube004.geometry} material={materials.Skin} skeleton={nodes.Cube004.skeleton} />
      <skinnedMesh geometry={nodes.Cube004_1.geometry} material={materials.Black} skeleton={nodes.Cube004_1.skeleton} />
      <skinnedMesh geometry={nodes.Cube004_2.geometry} material={materials.Belt} skeleton={nodes.Cube004_2.skeleton} />
      <skinnedMesh geometry={nodes.Cube004_3.geometry} material={materials.Shirt} skeleton={nodes.Cube004_3.skeleton} />
      <skinnedMesh
        geometry={nodes.Cube004_4.geometry}
        material={materials.Details}
        skeleton={nodes.Cube004_4.skeleton}
      />
      <skinnedMesh geometry={nodes.Cube004_5.geometry} material={materials.Face} skeleton={nodes.Cube004_5.skeleton} />
      <skinnedMesh geometry={nodes.Cube004_6.geometry} material={materials.Beige} skeleton={nodes.Cube004_6.skeleton} />
      <skinnedMesh geometry={nodes.Cube004_7.geometry} material={materials.Brown} skeleton={nodes.Cube004_7.skeleton} />
    </group>
  );
}

useGLTF.preload("models/pugHead.glb");
