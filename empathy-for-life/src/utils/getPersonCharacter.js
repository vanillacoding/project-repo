const getPersonCharacter = (character) => {
  const personNumber = character.split("person")[1];
  const CHRACTER_SIZE = 32;

  return {
    walk: {
      up: {
        initX: CHRACTER_SIZE * 8,
        initY: personNumber * CHRACTER_SIZE,
        x: CHRACTER_SIZE * 8,
        y: personNumber * CHRACTER_SIZE,
        width: CHRACTER_SIZE,
        height: CHRACTER_SIZE,
        gap: CHRACTER_SIZE,
        maxX: CHRACTER_SIZE * 11,
      },
      right: {
        initX: CHRACTER_SIZE * 4,
        initY: personNumber * CHRACTER_SIZE,
        x: CHRACTER_SIZE * 4,
        y: personNumber * CHRACTER_SIZE,
        width: CHRACTER_SIZE,
        height: CHRACTER_SIZE,
        gap: CHRACTER_SIZE,
        maxX: CHRACTER_SIZE * 7,
      },
      down: {
        initX: 0,
        initY: personNumber * CHRACTER_SIZE,
        x: 0,
        y: personNumber * CHRACTER_SIZE,
        width: CHRACTER_SIZE,
        height: CHRACTER_SIZE,
        gap: CHRACTER_SIZE,
        maxX: CHRACTER_SIZE * 3,
      },
      left: {
        initX: CHRACTER_SIZE * 12,
        initY: personNumber * CHRACTER_SIZE,
        x: CHRACTER_SIZE * 12,
        y: personNumber * CHRACTER_SIZE,
        width: CHRACTER_SIZE,
        height: CHRACTER_SIZE,
        gap: CHRACTER_SIZE,
        maxX: CHRACTER_SIZE * 15,
      },
    },
    drawSize: CHRACTER_SIZE * 2,
  };
};

export default getPersonCharacter;
