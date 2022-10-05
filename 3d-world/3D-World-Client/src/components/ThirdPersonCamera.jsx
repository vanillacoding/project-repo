import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";

function getThridPersonCameraPosition(position, hasLimit, handleCameraStop) {
  return position.map((pos, index) => {
    if (index === 0) {
      return pos - 30;
    }
    if (index === 1) {
      return 140;
    }
    if (index === 2) {
      if (hasLimit) {
        if (pos <= -6300 || pos > 80) {
          handleCameraStop();
          return;
        }
      }

      return pos + 350;
    }

    return pos;
  });
}

function ThirdPersonCamera({ positionRef, hasLimit, handleCameraStop }) {
  const vec = useMemo(() => new THREE.Vector3());

  useFrame(({ camera }) => {
    camera.position.lerp(
      vec.set(...getThridPersonCameraPosition(positionRef.current, hasLimit, handleCameraStop)),
      0.1,
    );
  });

  return null;
}

export default ThirdPersonCamera;
