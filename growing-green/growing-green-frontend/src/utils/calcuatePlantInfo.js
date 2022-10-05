import differenceInDays from 'date-fns/differenceInDays';
import addHours from 'date-fns/addHours';

export function calculatePlantInfo(plant, weather = 'Clear', currentDate) {
  const {
    createdAt,
    updatedAt,
    waterGuage,
    isBlindUp,
    isSunPlant,
    sunGuage,
    penaltyPoints,
    growthStage,
  } = plant;

  const updates = {
    sunGuage: sunGuage.currentGuage,
    waterGuage: waterGuage.currentGuage,
    penaltyPoints: penaltyPoints,
    growthStage,
  };

  const createdDate = new Date(createdAt);
  const lastLoginDate = new Date(updatedAt);
  const today = new Date(currentDate);

  const watering = waterGuage.defaultGuage;
  const NumberOfElapsedDate = differenceInDays(today, createdDate);

  const passedDays = [];
  const wateringDays = [];

  for (let i = 0; i < NumberOfElapsedDate; i++) {
    const passedDay = addHours(createdDate, 24 * (i + 1));

    passedDays.push(passedDay);
  }

  updates.growthStage = calculateGrowth(passedDays.length, growthStage);

  for (let i = 0; i < NumberOfElapsedDate / watering; i++) {
    const wateringDay = addHours(createdDate, 24 * ((i + 1) * watering));

    wateringDays.push(wateringDay);
  }

  const passDaysAfterUpdate = passedDays.filter((day) => day > lastLoginDate);
  const wateringDaysAfterUpdate = wateringDays.filter(
    (day) => day > lastLoginDate && day < today,
  );

  const wateringCount = wateringDaysAfterUpdate.length;

  if (wateringCount >= 1) {
    updates.waterGuage = 0;
    updates.penaltyPoints += wateringCount;
  }

  if (weather === 'rainy') {
    updates.waterGuage = waterGuage.defaultGuage;
  }

  if (isSunPlant === true) {
    if (isBlindUp === true) {
      const increasedGuage = sunGuage.currentGuage + passDaysAfterUpdate.length;
      const defaultGauge = sunGuage.defaultGuage;

      updates.sunGuage =
        increasedGuage > defaultGauge ? defaultGauge : increasedGuage;
    }

    if (isBlindUp === false) {
      const decreasedGuage = sunGuage.currentGuage - passDaysAfterUpdate.length;

      updates.sunGuage = decreasedGuage > 0 ? decreasedGuage : 0;

      if (decreasedGuage < 0) {
        updates.penaltyPoints = penaltyPoints - decreasedGuage;
      }
    }
  }

  if (isSunPlant === false) {
    if (isBlindUp === true) {
      const increasedGuage = sunGuage.currentGuage + passDaysAfterUpdate.length;
      const defaultGauge = sunGuage.defaultGuage;

      updates.sunGuage =
        increasedGuage > defaultGauge ? defaultGauge : increasedGuage;

      if (increasedGuage > defaultGauge) {
        const decreasePoints = increasedGuage - defaultGauge;
        updates.penaltyPoints = penaltyPoints - decreasePoints;
      }
    }

    if (isBlindUp === false) {
      const decreasedGuage = sunGuage.currentGuage - passDaysAfterUpdate.length;

      updates.sunGuage = decreasedGuage > 0 ? decreasedGuage : 0;
    }
  }

  const updatedPlant = {
    ...plant,
    sunGuage: {
      ...plant.sunGuage,
      currentGuage: updates.sunGuage,
    },
    waterGuage: {
      ...plant.waterGuage,
      currentGuage: updates.waterGuage,
    },
    penaltyPoints: updates.penaltyPoints,
    growthStage: updates.growthStage,
  };

  return updatedPlant;
}

function calculateGrowth(passedDays, current) {
  const ADULT_STAGE = 3;

  if (passedDays >= 14) {
    return ADULT_STAGE;
  } else if (passedDays >= 7) {
    return current + 1 >= 3 ? 3 : current + 1;
  } else {
    return current;
  }
}
