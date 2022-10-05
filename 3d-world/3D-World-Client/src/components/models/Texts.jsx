/* eslint-disable no-useless-escape */
import React, { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

const speacialTextRegex = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\ '\"\\(\=]/gi;

function Texts({ ...props }) {
  const font = useLoader(THREE.FontLoader, "fonts/bold.blob");
  const config = useMemo(
    () => ({
      font,
      size: 10,
      height: 1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: 0.1,
      bevelSegments: 10,
    }),
    [font],
  );
  const group = useRef();
  const texts = props.letters?.toUpperCase().replace(speacialTextRegex, "") || "RANDOM";

  return (
    <group {...props} ref={group}>
      <mesh>
        <textBufferGeometry args={[texts, config]} />
        <meshStandardMaterial
          attach="material"
          metalness={0.2}
          roughness={0.3}
          color={props.color}
        />
      </mesh>
    </group>
  );
}

Texts.propTypes = {
  letters: PropTypes.string,
  color: PropTypes.string,
};

Texts.defaultProps = {
  color: "#f7b77e",
};

export default Texts;
