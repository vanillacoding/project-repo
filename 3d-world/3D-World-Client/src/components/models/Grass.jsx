import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

function Grass({ position, onClick, currentFurnitureId }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  function handleChange() {
    if (currentFurnitureId) {
      setHovered(true);
    }
  }

  return (
    <mesh
      ref={mesh}
      scale={1}
      position={[...position]}
      onClick={onClick}
      onPointerOver={handleChange}
      onPointerOut={() => setHovered(false)}
    >
      <boxBufferGeometry attach="geometry" args={[39, 10, 39]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "tomato" : "#b08968"}
      />
    </mesh>
  );
}

Grass.propTypes = {
  position: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  currentFurnitureId: PropTypes.string,
};

Grass.defaultProps = {
  onClick: () => {},
};

export default Grass;
