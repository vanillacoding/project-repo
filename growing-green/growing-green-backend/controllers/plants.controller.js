const Plant = require('../models/Plant');
const {
  BaseError,
  BadRequestError,
  InvalidTokenError,
  TokenExpiredError,
} = require('../lib/errors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../configs');

exports.getAllPlantsById = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { _id } = await jwt.verify(token, tokenSecretKey);
    const plants = await Plant.find({ userId: _id }).lean();
    const plantsWithTimeStamp = plants.map((plant) => {
      return { ...plant, createAt: plant._id.getTimestamp() };
    });

    return res.status(201).json(plantsWithTimeStamp);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new TokenExpiredError());
    }

    next(new InvalidTokenError());
  }
};

exports.getMostPopularPlants = async (req, res, next) => {
  try {
    const allSpecies = await Plant.find({}, { _id: 0, species: 1 });
    const popularPlants = [];
    const numberOfPlants = {};

    allSpecies.forEach(({ species }) => {
      if (numberOfPlants[species]) {
        numberOfPlants[species] += 1;
      } else {
        numberOfPlants[species] = 1;
        popularPlants.push(species);
      }
    });

    const sortedPopularPlants = popularPlants.sort(
      (a, b) => numberOfPlants[a] > numberOfPlants[b],
    );

    const topFivePlants = sortedPopularPlants.slice(0, 5);

    return res.status(201).json(topFivePlants);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new TokenExpiredError());
    }

    next(new InvalidTokenError());
  }
};

exports.createNewPlant = async (req, res, next) => {
  const data = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const { _id } = await jwt.verify(token, tokenSecretKey);

  if (!data) {
    return next(new BadRequestError('식물 데이터가 유효하지 않습니다.'));
  }

  try {
    const defaultSunGuage = data.isSunPlant ? 5 : 3;
    const defaultWaterGuage = data.watering;

    const newPlant = await Plant.create({
      userId: _id,
      name: data.name,
      species: data.species,
      type: data.type,
      isSunPlant: data.isSunPlant,
      sunGuage: {
        defaultGuage: defaultSunGuage,
        currentGuage: defaultSunGuage,
      },
      waterGuage: {
        defaultGuage: defaultWaterGuage,
      },
      growthStage: data.growthStage,
    });

    res.json({
      plant: newPlant,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(err.message));
    }

    next(new BaseError(err.message));
  }
};

exports.updatePlant = async (req, res, next) => {
  try {
    const { plantId } = req.params;

    if (!plantId) {
      return next(new BadRequestError());
    }

    const { state, isIncrease } = req.body;
    const targetPlant = await Plant.findOne({ _id: plantId });

    switch (state) {
      case 'water': {
        if (isIncrease === true) {
          targetPlant.waterGuage.currentGuage =
            targetPlant.waterGuage.currentGuage + 1;
        } else {
          targetPlant.waterGuage.currentGuage =
            targetPlant.waterGuage.currentGuage - 1;
        }

        break;
      }

      case 'sun': {
        if (isIncrease === true) {
          targetPlant.sunGuage.currentGuage =
            targetPlant.sunGuage.currentGuage + 1;
        } else {
          targetPlant.sunGuage.currentGuage =
            targetPlant.sunGuage.currentGuage - 1;
        }

        break;
      }

      case 'blind': {
        targetPlant.isBlindUp = !targetPlant.isBlindUp;

        if (targetPlant.isBlindUp === true) {
          targetPlant.lastBlindUpDate = new Date();
        }

        break;
      }

      case 'penalty': {
        if (isIncrease === true) {
          targetPlant.penaltyPoints = targetPlant.penaltyPoints + 1;
        } else {
          targetPlant.penaltyPoints = targetPlant.penaltyPoints - 1;
        }

        break;
      }

      case 'dead': {
        targetPlant.isDead = true;

        break;
      }
    }

    await targetPlant.save();

    return res.status(201).json({ plant: targetPlant });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError('유효하지 않은 데이터입니다.'));
    }

    next(new BaseError());
  }
};

exports.updatePlantAll = async (req, res, next) => {
  try {
    const updatedPlants = req.body;

    updatedPlants.forEach(async (plant) => {
      const targetPlant = await Plant.findOne({ _id: plant._id });

      targetPlant.growthState = plant.growthState;
      targetPlant.penaltyPoints = plant.penaltyPoints;
      targetPlant.waterGuage.currentGuage = plant.waterGuage.currentGuage;
      targetPlant.sunGuage.currentGuage = plant.sunGuage.currentGuage;

      await targetPlant.save();
    });

    return res.status(201).json({ plant: updatedPlants });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError('유효하지 않은 데이터입니다.'));
    }

    next(new BaseError());
  }
};

exports.deletePlant = async (req, res, next) => {
  const { plantId } = req.params;

  if (!plantId) {
    return next(new BadRequestError());
  }

  try {
    await Plant.deleteOne({ _id: plantId });
  } catch {
    next(new BaseError());
  }
};
