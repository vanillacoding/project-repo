import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import throttle from "lodash.throttle";

import {
  ReducerContext,
  selectors,
} from "../features/rootSlice";
import { IMAGE_URLS, AXIS_CORRECTION } from "../constants/constants";
import socket from "../socket/socket";
import getMyCharacterControllers from "../drawings/getMyCharacterControllers";
import getAutomaticMoveDog from "../drawings/getAutomaticMoveDog";
import getThrottleEmit from "../utils/getThrottleEmit";

const emitMyCharacterDrawing = getThrottleEmit(
  60,
  { leading: false, trailing: true },
);
const drawCanvas = throttle(
  (drawingFunction) => requestAnimationFrame(drawingFunction),
  1200,
);

const useCanvasDraw = (ref) => {
  const history = useHistory();
  const { state } = useContext(ReducerContext);
  let userName = selectors.getUserName(state);
  const userCharacter = selectors.getUserCharacter(state);
  const isAdmin = selectors.getIsAdministrator(state);

  if (isAdmin) {
    userName += "(관리자)";
  }

  useEffect(() => {
    const modal = history.location;
    const ctx = ref.current.getContext("2d");
    ctx.font = "3vh neodgm";
    ctx.fillStyle = "white";
    const { canvas } = ctx;
    const personImage = new Image();
    const dogsImage = new Image();
    personImage.src = IMAGE_URLS.PERSON_SPRITE;
    dogsImage.src = IMAGE_URLS.DOGS_SPRITE;
    const images = [personImage, dogsImage];
    let timeIds = [];
    let dogElements = [];
    let personElements = [];

    canvas.addEventListener("click", (event) => {
      const clickedX = Math.trunc(event.offsetX * AXIS_CORRECTION.x);
      const clickedY = Math.trunc(event.offsetY * AXIS_CORRECTION.y);

      const clickedDog = dogElements.find((dog) => {
        const isClickedDog
          = dog.dx <= clickedX
            && clickedX <= dog.dx + dog.dWidth
            && dog.dy <= clickedY
            && clickedY <= dog.dy + dog.dHeight;

        return isClickedDog;
      });

      if (clickedDog) {
        history.push(`/dogs/${clickedDog._id}`, { modal });
      }
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      personElements.forEach((personElement, index) => {
        if (!index) {
          const shouldEmit
          = personElement.lastDx !== personElement.dx
          || personElement.lastDy !== personElement.dy;
          if (shouldEmit) {
            emitMyCharacterDrawing(
              "user canvas image",
              personElement,
            );
          }
        }

        ctx.drawImage(
          personImage,
          personElement.sx,
          personElement.sy,
          personElement.sWidth,
          personElement.sHeight,
          personElement.dx,
          personElement.dy,
          personElement.dWidth,
          personElement.dHeight,
        );
        ctx.fillText(
          personElement.name,
          personElement.dx,
          personElement.dy + personElement.dHeight + 20,
        );
      });

      dogElements.forEach((dogElement) => {
        if (!dogElement.hadRequest && dogElement.shouldUpdate) {
          dogElement.hadRequest = true;
          socket.emit("update a dog for drawing", dogElement._id);
        }

        ctx.drawImage(
          dogsImage,
          dogElement.sx,
          dogElement.sy,
          dogElement.sWidth,
          dogElement.sHeight,
          dogElement.dx,
          dogElement.dy,
          dogElement.dWidth,
          dogElement.dHeight,
        );
        ctx.fillText(
          dogElement.name,
          dogElement.dx,
          dogElement.dy + dogElement.dHeight + 20,
        );
      });

      drawCanvas(draw);
    };

    const checkImageLoad = () => {
      if (images.every((image) => image.complete)) {
        requestAnimationFrame(draw);
      }

      setTimeout(checkImageLoad, 100);
    };

    const {
      myCharacterDrawingObject,
      walkMyCharacter,
      stopMyCharacter,
    } = getMyCharacterControllers(
          canvas.width,
          canvas.height,
          userCharacter,
          userName,
        );

    const throttledStopMyCharacter = throttle(
      (event) => walkMyCharacter(event),
      100,
      { leading: true, trailing: false }
    );

    emitMyCharacterDrawing(
      "user canvas image",
      myCharacterDrawingObject,
    );
    personElements.push(myCharacterDrawingObject);
    document.addEventListener(
      "keydown",
      throttledStopMyCharacter,
    );
    document.addEventListener(
      "keyup",
      stopMyCharacter
    );

    checkImageLoad();

    socket.on(
      "current users",
      (otherDrawElements) => {
        personElements = personElements.concat(otherDrawElements);
      },
    );
    socket.on(
      "another user draw element",
      (anotherUserDrawElement) => {
        let hasUser = false;
        for (const element of personElements) {
          if (element.id === anotherUserDrawElement.id) {
            hasUser = true;
            Object.assign(element, anotherUserDrawElement);
            break;
          }
        }

        if (!hasUser) {
          personElements.push(anotherUserDrawElement);
        }
      },
    );
    socket.on(
      "disconnected user",
      ({ id: anotherUserId }) => {
        personElements = personElements.filter(
          (element) => element.id !== anotherUserId,
        );
      },
    );
    socket.on(
      "current dogs",
      (dogs) => {
        dogElements = dogs || [];
        dogElements.map((dog) => getAutomaticMoveDog(dog));
        timeIds.push(
          setInterval(() => socket.emit("update all dogs"),  10 * 1000),
        );
      },
    );
    socket.on(
      "update a dog",
      (dog) => {
        const dogElement = dogElements.find(
          (dogEl) => dogEl._id === dog._id,
        );
        if (dogElement) {
          dogElement.targetCoordinates = dog.targetCoordinates;
          dogElement.hadRequest = false;
          dogElement.shouldUpdate = false;
        }
      },
    );
    socket.on(
      "update all dogs",
      (dogs) => {
        dogElements.forEach((dog) => dog.stop());
        dogElements = dogs;
        dogElements.map((dog) => getAutomaticMoveDog(dog));
      },
    );

    return () => {
      timeIds.forEach((timeId) => clearInterval(timeId));
      dogElements.forEach((dog) => dog.stop());
      document.removeEventListener("keydown", throttledStopMyCharacter);
      document.removeEventListener("keyup", stopMyCharacter);
      personElements = [];
      [
        "current users",
        "another user draw element",
        "disconnected user",
        "current dogs",
        "update a dog",
      ].forEach((socketEvent) => socket.removeAllListeners(socketEvent));
    };
  }, [ref, history, userCharacter, userName]);
};

export default useCanvasDraw;
