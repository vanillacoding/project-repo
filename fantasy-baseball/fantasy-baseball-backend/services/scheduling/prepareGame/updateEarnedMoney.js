const Game = require("../../../models/Game");
const Statistic = require("../../../models/Statistic");
const UserBettingData = require("../../../models/UserBettingData");
const logger = require("../../../config/winston");

const updateMoneyForUser = async (users, gameDate, moneyType, session) => {
  await Promise.all(
    users.map((user) => (
      UserBettingData.findOneAndUpdate(
        { gameDate, user: user.id },
        {
          $inc: {
            earnedMoney: user[moneyType],
          },
        },
        { session }
      )
    ))
  );
};

const calculateLosingMoneyForWinner = async (
  winners,
  gameDate,
  winnerMoneyList,
  ratio
) => {
  try {
    const gameData = await Game.findOne({ gameDate });
    const totalBettingMoneyPerPosition = gameData.totalMoney / 10;
    const winnerList = [];

    winners.forEach((position, positionIndex) => {
      let losingMoney = (
        totalBettingMoneyPerPosition - winnerMoneyList[positionIndex].totalMoney
      ) * ratio;

      position.users.forEach((group) => {
        losingMoney = Math.round(losingMoney / position.users.length);

        group.forEach((user) => {
          const totalWinnerMoneyPerGroup = group.reduce(
            (acc, winner) => (
              acc + winner.bettingMoney
            ), 0
          );
          const percentage = Number(
            (user.bettingMoney / totalWinnerMoneyPerGroup).toFixed(2)
          );
          winnerList.push({
            id: user.id,
            earnedMoney: Math.round(losingMoney * percentage),
          });
        });
      });
    });

    return winnerList;
  } catch (err) {
    logger.log(err);
  }
};

module.exports = async (gameDate, session) => {
  logger.info("Start: update earned money");

  try {
    const statisticsPerPosition = await Statistic
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
                $cond: {
                  if: {
                    $gt: ["$totalBettingMoney", 0],
                  },
                  then: {
                    player: "$playerId",
                    score: "$score",
                    totalBettingMoney: "$totalBettingMoney",
                    users: "$users",
                  },
                  else: "$noval",
                },
              },
            },
          },
        },
      ])
      .session(session);

    const usersSelectingFirstPlayer = [];
    const usersSelectingSecondPlayer = [];
    const winnersMoneyList = [];
    let awardedUsers = [];

    const hasBettings = statisticsPerPosition.some((position) => (
      position.players.length !== 0
    ));

    if (!hasBettings) {
      logger.info("Log: no betting users");
      return false;
    }

    statisticsPerPosition.forEach((position, positionIndex) => {
      const bestScore = position.players[0].score;
      let secondScore = null;

      winnersMoneyList.push({
        position: position._id,
        totalMoney: 0,
      });

      position.players.forEach((player, playerIndex) => {
        if (bestScore === player.score) {
          if (usersSelectingFirstPlayer[positionIndex]) {
            usersSelectingFirstPlayer[positionIndex].users.push(
              player.users
            );
            winnersMoneyList[positionIndex].totalMoney += player.totalBettingMoney;
            awardedUsers.push(player.users);
            return;
          }

          usersSelectingFirstPlayer.push({
            position: position._id,
            users: [player.users],
          });
          winnersMoneyList[positionIndex].totalMoney += player.totalBettingMoney;
          awardedUsers.push(player.users);
          return;
        }

        if (usersSelectingFirstPlayer[positionIndex].users.length > 1) return;

        if (secondScore === player.score) {
          if (usersSelectingSecondPlayer[positionIndex]) {
            usersSelectingSecondPlayer[positionIndex].users.push(
              player.users
            );
            winnersMoneyList[positionIndex].totalMoney += player.totalBettingMoney;
            awardedUsers.push(player.users);
          }
          return;
        }

        if (bestScore > player.score) {
          if (secondScore !== null || secondScore > player.score) return;

          secondScore = player.score;
          usersSelectingSecondPlayer.push({
            position: position._id,
            users: [player.users],
          });
          winnersMoneyList[positionIndex].totalMoney += player.totalBettingMoney;
          awardedUsers.push(player.users);
          return;
        }

        if (playerIndex === position.players.length - 1) {
          secondScore = null;
        }
      });
    });

    awardedUsers = awardedUsers.flat();

    await updateMoneyForUser(awardedUsers, gameDate, "bettingMoney", session);

    const firstWinnerList = await calculateLosingMoneyForWinner(
      usersSelectingFirstPlayer,
      gameDate,
      winnersMoneyList,
      0.7
    );
    const secondWinnerList = await calculateLosingMoneyForWinner(
      usersSelectingSecondPlayer,
      gameDate,
      winnersMoneyList,
      0.3
    );

    await updateMoneyForUser(firstWinnerList, gameDate, "earnedMoney", session);
    await updateMoneyForUser(secondWinnerList, gameDate, "earnedMoney", session);

    logger.info("Success: update earned money");

    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};
