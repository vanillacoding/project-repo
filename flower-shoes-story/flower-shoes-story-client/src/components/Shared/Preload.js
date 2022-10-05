import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import bg_texture from "../../assets/bg_texture.png";
import bg_texture_fragment from "../../assets/bg_texture_fragment.png";

const Preload = () => {
  const preload = useSelector((state) => state.preload.isLoaded);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 1500);
  }, [preload]);

  return (
    <Wrapper animation={animation} />
  );
};

const Wrapper = styled.div`
  z-index: 100;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #1a1a1a;
  transform: ${({ animation }) => animation ? "scaleY(0)" : "scaleY(1)"};
  transform-origin: 0 100%;
  transition: .95s cubic-bezier(.82,.01,.21,1);

  :before, :after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 110;
  }

  :before {
    background: url(${bg_texture_fragment}) repeat 50%/130px 130px;
    opacity: 0.15;
  }

  :after {
    background: url(${bg_texture}) repeat 50%/350px 200px;
    opacity: 0.25;
  }
`;

export default Preload;
