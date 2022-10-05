import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

import {
  updatePlant,
  deletePlant,
  changeCurrentPlant,
} from '../redux/modules/plants';
import TextButton from '../components/TextButton';

import PlantContainer from '../pixi/displayObjects/PlantContainer';
import Background from '../pixi/displayObjects/Background';
import WateringContainer from '../pixi/displayObjects/WateringContainer';
import GuageContainer from '../pixi/displayObjects/GuageContainer';
import Arrows from '../pixi/displayObjects/Arrows';

import { isWaterGuageOver } from '../utils/isWaterGuageOver';
import { isPlantAlive } from '../utils/isPlantAlive';

window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export default function PlantCanvas({ plants }) {
  const { isDone } = useSelector((state) => state.images);
  const { currentPlant } = useSelector((state) => state.plants);
  const dispatch = useDispatch();
  const history = useHistory();
  const canvas = useRef(null);
  const plant = useRef(currentPlant);

  let app;
  let arrows;
  let plantBox;
  let backgrounds = [];
  let guageList = [];
  let wateringList = [];
  let plantContainers = [];
  let currentWaterGuages = [];
  let defaultWaterGuages = [];
  let currentPenaltyPoints = [];
  let currentPlantIndex = plants.indexOf(currentPlant);

  useEffect(() => {
    if (!isDone) return;

    setup(canvas.current, plant.current);

    return () => {
      app.ticker.remove(loop);
      app.destroy();
    };
  }, []);

  function setup(canvas, plant) {
    app = new PIXI.Application({
      backgroundAlpha: 0,
      width: 1200,
      height: 700,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });

    canvas.appendChild(app.view);

    for (let i = 0; i < plants.length; i++) {
      const plantContainer = new PIXI.Container();
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

      const currentWaterGuage = waterGuage.currentGuage;
      currentWaterGuages.push(currentWaterGuage);
      const defaultWaterGuage = waterGuage.defaultGuage;
      defaultWaterGuages.push(defaultWaterGuage);

      const currentPenaltyPoint = penaltyPoints;
      currentPenaltyPoints.push(currentPenaltyPoint);

      const background = new Background(
        app,
        name,
        species,
        isBlindUp,
        _id,
        currentPenaltyPoint,
      );
      plantContainer.addChild(background.container);
      backgrounds.push(background);

      plantBox = new PlantContainer(app, type, growthStage, isDead);
      plantContainer.addChild(plantBox.container);

      const watering = new WateringContainer(
        app,
        isDead,
        false,
        plantBox.container,
      );
      plantContainer.addChild(watering.container);
      wateringList.push(watering);

      const guage = new GuageContainer(app, sunGuage, waterGuage);
      plantContainer.addChild(guage.container);
      guageList.push(guage);

      plantContainers.push(plantContainer);
    }

    arrows = new Arrows(app);

    app.stage.addChild(arrows.container, plantContainers[currentPlantIndex]);

    arrows.leftArrow.on('pointerdown', renderPreviousPlant);
    arrows.rightArrow.on('pointerdown', renderNextPlant);

    app.ticker.add(loop);
  }

  function renderPreviousPlant() {
    app.stage.removeChild(plantContainers[currentPlantIndex]);
    currentPlantIndex -= 1;
    app.stage.addChild(plantContainers[currentPlantIndex]);
    plant.current = plants[currentPlantIndex];
    dispatch(changeCurrentPlant(plant.current));
  }

  function renderNextPlant() {
    app.stage.removeChild(plantContainers[currentPlantIndex]);
    currentPlantIndex += 1;
    app.stage.addChild(plantContainers[currentPlantIndex]);
    plant.current = plants[currentPlantIndex];
    dispatch(changeCurrentPlant(plant.current));
  }

  function loop() {
    if (currentPlantIndex === 0) {
      arrows.leftArrow.visible = false;
    } else {
      arrows.leftArrow.visible = true;
    }

    if (currentPlantIndex === plants.length - 1) {
      arrows.rightArrow.visible = false;
    } else {
      arrows.rightArrow.visible = true;
    }

    const totalGuageWidth = 400;
    const wateringPeriod = plant.current.waterGuage.defaultGuage;
    const eachGuageWidth = totalGuageWidth / wateringPeriod;

    for (let i = 0; i < plants.length; i++) {
      if (wateringList[i].wateringCan.isWatering === true) {
        guageList[i].waterGuage.width += eachGuageWidth;
        wateringList[i].wateringCan.isWatering = false;

        increaseWaterGuage(plant.current);
      }
    }
  }

  function increaseWaterGuage(plant) {
    const isOver = isWaterGuageOver(
      currentWaterGuages[currentPlantIndex],
      defaultWaterGuages[currentPlantIndex],
    );

    dispatch(
      updatePlant({
        plantId: plant.current._id,
        data: {
          state: 'water',
          isIncrease: true,
        },
      }),
    );

    if (isOver === true) {
      currentWaterGuages[currentPlantIndex] += 1;
    } else {
      const isAlive = isPlantAlive(currentWaterGuages[currentPlantIndex]);
      if (isAlive === true) {
        currentPenaltyPoints[currentPlantIndex] += 1;
        backgrounds[currentPlantIndex].pointText.text = `${
          10 - currentPenaltyPoints[currentPlantIndex]
        }`;
        alert(
          `-1점 감점되었습니다. (남은 생명 수 ${
            10 - currentPenaltyPoints[currentPlantIndex]
          }점)`,
        );
        dispatch(
          updatePlant({
            plantId: plant.current._id,
            data: {
              state: 'penalty',
              isIncrease: true,
            },
          }),
        );
      } else {
        alert('식물이 죽었습니다.');

        dispatch(
          updatePlant({
            plantId: plant.current._id,
            data: {
              state: 'dead',
            },
          }),
        );

        history.push('/');
      }
    }
  }

  function onDeleteButtonClick() {
    dispatch(deletePlant(plant.current._id));
    history.push('/');
  }

  return (
    <Wrapper>
      {plant.current?.isDead === true && (
        <ButtonWrapper>
          <TextButton
            onClick={onDeleteButtonClick}
            variant="rounded"
            size="short"
            color="translucentRed"
            label="식물 삭제하기"
          />
        </ButtonWrapper>
      )}
      <div ref={canvas} data-testid="canvas" />
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
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(100px, -130px);
`;
