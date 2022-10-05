import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

import PlantContainer from '../pixi/displayObjects/PlantContainer';
import Background from '../pixi/displayObjects/Background';
import GuageContainer from '../pixi/displayObjects/GuageContainer';

window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export default function TimeTravelCanvas() {
  const { isDone } = useSelector((state) => state.images);
  const { plantsInWeek, currentPlant } = useSelector(
    (state) => state.timeTravel,
  );
  const travelCanvas = useRef(null);
  const plants = useRef(plantsInWeek);
  const app = useRef();
  let currentContainer;
  let containers = [];
  let index = 7;

  useEffect(() => {
    if (!isDone) return;

    setup(travelCanvas.current, [...plants.current, currentPlant]);

    return () => {
      app.current.destroy();
      travelCanvas.current = null;
    };
  }, []);

  function setup(canvas, plants) {
    app.current = new PIXI.Application({
      backgroundAlpha: 0,
      width: 1200,
      height: 700,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });

    canvas.appendChild(app.current.view);

    for (let i = 0; i < plants.length; i++) {
      const container = new PIXI.Container();
      const {
        _id,
        growthStage,
        isBlindUp,
        type,
        name,
        species,
        sunGuage,
        waterGuage,
        penaltyPoints,
        isDead,
      } = plants[i];

      const currentPenaltyPoint = penaltyPoints;

      const background = new Background(
        app.current,
        name,
        species,
        isBlindUp,
        _id,
        currentPenaltyPoint,
      );
      background.container.removeChild(background.pullSwitch);

      container.addChild(background.container);

      const plantBox = new PlantContainer(
        app.current,
        type,
        growthStage,
        isDead,
      );

      container.addChild(plantBox.container);

      const guage = new GuageContainer(app.current, sunGuage, waterGuage);
      container.addChild(guage.container);

      containers.push(container);
      app.current.ticker.remove(plantBox.plant.defaultLoop);
      app.current.ticker.remove(plantBox.plant.bigLoop);
    }

    const texture1 = app.current.renderer.generateTexture(
      new PIXI.Graphics().drawRect(0, 67, 230, 600),
    );

    const plantSprite = new PIXI.Sprite(texture1);
    plantSprite.y = 67;

    plantSprite.buttonMode = true;
    plantSprite.interactive = true;

    plantSprite.on('click', onSprite1Click);

    currentContainer = containers[7];

    app.current.stage.addChild(containers[index], plantSprite);
  }

  function onSprite1Click(e) {
    const { y } = e.data.global;

    if (y < 104) {
      app.current.stage.removeChild(containers[index]);
      app.current.stage.addChild(containers[0]);
      index = 0;
    } else if (y < 182) {
      app.current.stage.removeChild(containers[index]);
      app.current.stage.addChild(containers[1]);
      index = 1;
    } else if (y < 263) {
      app.current.stage.removeChild(containers[index]);
      app.current.stage.addChild(containers[2]);
      index = 2;
    } else if (y < 345) {
      app.current.stage.removeChild(containers[index]);
      app.current.stage.addChild(containers[3]);
      index = 3;
    } else if (y < 428) {
      app.current.stage.removeChild(containers[index]);
      app.current.stage.addChild(containers[4]);
      index = 4;
    } else if (y < 515) {
      app.current.stage.removeChild(containers[index]);
      app.current.stage.addChild(containers[5]);
      index = 5;
    } else {
      app.current.stage.removeChild(containers[index]);
      app.current.stage.addChild(containers[6]);
      index = 6;
    }
  }

  return (
    <Wrapper>
      <div ref={travelCanvas} data-testid="travelCanvas" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  background-attachment: fixed;
  width: 1200px;
  height: 700px;
  border-radius: 1.5rem;
  padding-top: 40px;
  div {
    position: absolute;
    left: 100px;
  }
  z-index: 11;
`;
