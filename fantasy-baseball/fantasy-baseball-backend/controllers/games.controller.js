const createError = require("http-errors");
const checkBettingOpened = require("../utils/checkBettingOpened");
const Game = require("../models/Game");
const Player = require("../models/Player");
const User = require("../models/User");
const UserBettingData = require("../models/UserBettingData");
const Statistic = require("../models/Statistic");
const { PLAYER_POSITION } = require("../constants/game");

exports.getSchedule = async (req, res, next) => {
  try {
    const gameDate = req.params.game_date;
    const game = await Game.findOne({ gameDate }).lean();

    if (game === null) {
      next(createError(404, "Can't find schedule"));
      return;
    }

    res.status(200).json({
      result: "ok",
      data: game.schedule,
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

exports.getPlayers = async (req, res, next) => {
  try {
    const gameDate = req.params.game_date;
    const currentGame = await Game
      .findOne(
        { gameDate },
        "players"
      )
      .populate({
        path: "players",
        populate: {
          path: "statistics",
          match: {
            gameDate,
          },
          select: "position",
        },
      })
      .lean();

    if (currentGame === null) {
      next(createError(404, "Can't find players"));
      return;
    }

    const { players } = currentGame;

    if (players.length === 0) {
      next(createError(404, "Can't find players"));
      return;
    }

    const playersWithPosition = players.map((player) => {
      const { position } = player.statistics[0];
      const { statistics: removed, ...refinedPlayer } = player;

      refinedPlayer.position = position;

      return refinedPlayer;
    });

    res.status(200).json({
      result: "ok",
      data: playersWithPosition,
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

exports.postBetting = async (req, res, next) => {
  try {
    const gameDate = req.params.game_date;
    const { email } = res.locals.profile;
    const { roaster, bettingMoney } = req.body;

    const isBettingOpened = checkBettingOpened(new Date());

    if (isBettingOpened === false) {
      next(createError(401, "Betting is closed"));
      return;
    }

    const user = await User.findOne({ email });

    const userBettingData = await UserBettingData
      .findOne({ gameDate, user: user._id });

    if (userBettingData) {
      next(createError(409, "Can't save user play data because data already exists"));
      return;
    }

    const selectedPlayers = await Promise.all(
      roaster.map((id) => Player.findOne({ kboId: id }, "_id"))
    );
    const selectedPlayerIds = selectedPlayers.map((object) => object._id);

    await Promise.all(
      selectedPlayerIds.map((id) => Statistic.findOneAndUpdate(
        { gameDate, playerId: id },
        {
          $push: {
            users: {
              id: user._id,
              bettingMoney: bettingMoney / 10,
            },
          },
          $inc: {
            totalBettingMoney: bettingMoney / 10,
          },
        }
      ))
    );

    const newBettingData = await UserBettingData.create({
      user: user._id,
      gameDate,
      bettingMoney,
      roaster: selectedPlayerIds,
    });

    await Game.findOneAndUpdate(
      { gameDate },
      {
        $push: {
          userBettingData: newBettingData,
        },
        $inc: {
          totalMoney: bettingMoney,
        },
      }
    );

    await User.findOneAndUpdate(
      { email },
      {
        $inc: {
          money: -bettingMoney
        },
      }
    );

    res.status(201).json({ result: "ok" });
  } catch (err) {
    next(createError(500, err.message));
  }
};

exports.getBettingStatus = async (req, res, next) => {
  try {
    const gameDate = req.params.game_date;

    const currentGame = await Game.findOne({ gameDate });

    if (currentGame === null) {
      next(createError(404, "Can't find betting status"));
      return;
    }

    const {
      userBettingData,
      totalMoney,
      hasResult,
    } = currentGame;

    res.status(200).json({
      result: "ok",
      data: {
        users: userBettingData,
        totalMoney,
        hasResult,
      },
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

exports.getUserRankings = async (req, res, next) => {
  try {
    const gameDate = req.params.game_date;
    const userRankings = await UserBettingData
      .find(
        { gameDate, isCalculated: true },
        "roaster earnedMoney bettingMoney user rank profit"
      )
      .sort({ rank: 1 })
      .populate({
        path: "user",
        select: "name email imageUrl",
      })
      .lean();

    if (userRankings.length === 0) {
      next(createError(404, "Can't find userRankings"));
      return;
    }

    res.status(200).json({
      result: "ok",
      data: userRankings,
    });
  } catch (err) {
    next(createError(500, "Fail to get userRankings"));
  }
};

exports.getPlayerRankings = async (req, res, next) => {
  try {
    const gameDate = req.params.game_date;
    const isScoreCalculated = await Statistic
      .find(
        {
          gameDate,
          score: {
            $ne: null,
          },
        }
      );

    if (isScoreCalculated.length === 0) {
      next(createError(404, "Can't find playerRankings"));
      return;
    }

    const playerRankings = await Statistic
      .aggregate([
        {
          $match: {
            gameDate,
          },
        },
        {
          $lookup: {
            from: "players",
            localField: "playerId",
            foreignField: "_id",
            as: "playerInfo",
          },
        },
        {
          $sort: {
            score: -1,
          },
        },
        {
          $group: {
            _id: "$playerType",
            players: {
              $push: {
                name: "$name",
                team: "$team",
                score: "$score",
                users: "$users",
                position: "$position",
                playerInfo: "$playerInfo",
              },
            },
          },
        },
      ]);

    if (playerRankings.length === 0) {
      next(createError(404, "Can't find playerRankings"));
      return;
    }

    let hitterRankings;
    let pitcherRankings;

    playerRankings.forEach((playerType) => {
      if (playerType._id === "pitcher") {
        pitcherRankings = playerType.players;
        return;
      }
      hitterRankings = playerType.players;
    });

    res.status(200).json({
      result: "ok",
      data: {
        hitters: hitterRankings,
        pitchers: pitcherRankings,
      },
    });
  } catch (err) {
    next(createError(500, "Fail to get playerRankings"));
  }
};

exports.getPositionRankings = async (req, res, next) => {
  try {
    const gameDate = req.params.game_date;
    const positionRankings = await Statistic
      .aggregate([
        {
          $match: {
            gameDate,
          },
        },
        {
          $sort: {
            score: -1,
          },
        },
        {
          $group: {
            _id: "$position",
            players: {
              $push: {
                name: "$name",
                team: "$team",
                score: "$score",
                users: {
                  $size: {
                    $ifNull: ["$users", []]
                  },
                },
              },
            },
          },
        },
      ]);

    if (positionRankings.length === 0) {
      next(createError(404, "Can't find positionRankings"));
      return;
    }

    res.status(200).json({
      result: "ok",
      data: positionRankings,
    });
  } catch (err) {
    next(createError(500, "Fail to get position rankings"));
  }
};

exports.getRoaster = async (req, res, next) => {
  try {
    const gameDate = req.params.game_date;
    const { email } = res.locals.profile;

    const user = await User.findOne({ email });
    const bettingData = await UserBettingData
      .findOne(
        {
          gameDate,
          user: user._id
        },
        "roaster"
      )
      .populate({
        path: "roaster",
        select: "name team playerPhotoUrl statistics",
        populate: {
          path: "statistics",
          match: {
            gameDate
          },
          select: "position score totalBettingMoney",
        }
      })
      .lean();

    if (bettingData === null) {
      next(createError(404, "Can't find roaster"));
      return;
    }

    const roaster = {};
    bettingData.roaster.forEach((player) => {
      const position = PLAYER_POSITION[player.statistics[0].position];
      roaster[position] = {
        name: player.name,
        team: player.team,
        playerPhotoUrl: player.playerPhotoUrl,
        position: player.statistics[0].position,
        score: player.statistics[0].score,
        totalBettingMoney: player.statistics[0].totalBettingMoney,
      };
    });

    res.status(200).json({
      result: "ok",
      data: roaster,
    });
  } catch (err) {
    next(createError(500, "Fail to get user roaster"));
  }
};

exports.getBettingHistory = async (req, res, next) => {
  try {
    const { email } = res.locals.profile;

    const { _id: userId } = await User.findOne({ email });
    const userBettingHistory = await UserBettingData
      .find({
        user: userId,
      })
      .sort({ gameDate: -1 })
      .populate({
        path: "roaster",
      })
      .lean();

    if (userBettingHistory.length === 0) {
      next(createError(404, "Can't find user betting history"));
      return;
    }

    res.status(200).json({
      result: "ok",
      data: userBettingHistory,
    });
  } catch (err) {
    next(createError(500, "Fail to get betting history"));
  }
};
