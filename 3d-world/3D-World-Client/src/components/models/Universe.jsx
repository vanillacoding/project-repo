import React from "react";
import PropTypes from "prop-types";
import { Shadow, Stars } from "@react-three/drei";

function Universe({ position, radius }) {
  return (
    <>
      <color attach="background" args={["black"]} />
      <group position={position}>
        {/* <Stars radius={radius} /> */}
      </group>
      <mesh position={[100, 150, -300]} scale={[30, 30, 30]}>
        <sphereBufferGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#fcfabb" toneMapped={false} fog={false} />
        <Shadow scale={[10, 10, 1]} opacity={0.7} color="#fcfabb" />
      </mesh>
    </>
  );
}

Universe.propTypes = {
  position: PropTypes.array.isRequired,
  radius: PropTypes.number.isRequired,
};

export default Universe;
