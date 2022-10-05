import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

import PlantGrowth from '../pixi/displayObjects/PlantGrowth';
import background from '../assets/images/background/day.png';

export default function PlantGrowthCanvas({ plantType, onGrowthEnd, theme }) {
  const canvas = useRef(null);
  const { isDone } = useSelector((state) => state.images);
  const growthPlant = useRef();
  const app = useRef();

  useEffect(() => {
    if (!isDone) return;

    app.current = new PIXI.Application({
      backgroundAlpha: 0,
      width: 500,
      height: 500,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });

    canvas.current.appendChild(app.current.view);

    growthPlant.current = new PlantGrowth(app.current, plantType);
    app.current.stage.addChild(growthPlant.current.container);

    growthPlant.current.plant.play();

    return () => {
      canvas.current = null;
      app.current.ticker.remove(growthPlant.current.filterEffect);
      app.current.destroy();
    };
  }, []);

  return (
    <Wrapper theme={theme}>
      <div ref={canvas}></div>
      <CloseButton onClick={() => onGrowthEnd()}>닫기</CloseButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: url(${background});
  background-size: cover;
  width: 600px;
  height: 500px;
  padding: 2rem;
  border-radius: 25px;
`;

const CloseButton = styled.div`
  position: absolute;
  width: 70px;
  height: 20px;
  top: 1rem;
  right: 1rem;
  background: black;
  color: white;
  padding: 1rem;
  cursor: pointer;
`;
