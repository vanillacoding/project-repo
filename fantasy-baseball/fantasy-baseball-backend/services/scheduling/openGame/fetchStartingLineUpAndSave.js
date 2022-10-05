const { startSession } = require("mongoose");
const { format } = require("date-fns");
const Game = require("../../../models/Game");
const Player = require("../../../models/Player");
const Statistic = require("../../../models/Statistic");
const fetchPlayerEntry = require("../../fetchGameInfoFromKBO/fetchPlayerEntry");
const fetchPlayersInfo = require("../../fetchGameInfoFromKBO/fetchPlayersInfo");
const logger = require("../../../config/winston");

module.exports = async () => {
  logger.info("Start: fetch starting line up and save");

  const session = await startSession();

  try {
    session.startTransaction();

    // const dateString = format(new Date(), "yyyyMMdd");
    const dateString = "20210429";

    const currentGame = await Game
      .findOne(
        { gameDate: dateString },
        "schedule",
        { session }
      );

    logger.info(`Log: load ${dateString} game`);

    if (currentGame.schedule.length === 0) {
      throw new Error("Error: there is no game schedule");
    }

    const { schedule: gameList } = currentGame;

    const players = await fetchPlayerEntry(gameList);
    if (players.length === 0) {
      throw new Error("Error: there is no players");
    }

    logger.info(`Log: fetch ${players.length} players`);

    const playersWithInfo = await fetchPlayersInfo(players);
    if (playersWithInfo.length === 0) {
      throw new Error("Error : there is no player informations");
    }

    logger.info(`Log: fetch ${playersWithInfo.length} player informations`);

    const newPlayers = await Promise.all(
      playersWithInfo.map((player) => (
        Player.findOneAndUpdate(
          { kboId: player.kboId },
          {
            team: player.team,
            name: player.name,
            link: player.link,
            kboId: player.kboId,
            playerPhotoUrl: player.playerPhotoUrl,
            backNumber: player.backNumber,
            role: player.role,
          },
          {
            new: true,
            upsert: true,
            session,
          }
        )
      ))
    );

    const playerIds = newPlayers.map((player) => player._id);

    const newStatistics = await Promise.all(
      playersWithInfo.map((player) => (
        Statistic.findOneAndUpdate(
          {
            team: player.team,
            name: player.name,
            position: player.position,
            gameDate: dateString,
          },
          {
            name: player.name,
            team: player.team,
            position: player.position,
            playerType: player.playerType,
            gameDate: dateString,
          },
          {
            new: true,
            upsert: true,
            session,
          }
        )
      ))
    );

    const statisticIds = newStatistics.map((statistics) => statistics._id);

    const playersWithStatisticId = [];
    const statisticsWithPlayerId = [];
    for (let i = 0; i < newPlayers.length; i += 1) {
      const newPlayer = newPlayers[i];
      const newStatistic = newStatistics[i];
      const playerId = playerIds[i];
      const statisticsId = statisticIds[i];

      playersWithStatisticId.push(
        newPlayer.updateOne(
          {
            $push: {
              statistics: statisticsId,
            }
          },
          { session }
        )
      );

      statisticsWithPlayerId.push(
        newStatistic.updateOne(
          { playerId },
          { session }
        )
      );
    }

    await Promise.all(playersWithStatisticId);
    await Promise.all(statisticsWithPlayerId);

    logger.info("Log: save players");

    await currentGame.updateOne(
      {
        players: playerIds,
        isOpened: true,
      },
      { session }
    );

    logger.info("Success: fetch starting line up and save");

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    logger.error(err);
  } finally {
    session.endSession();
  }
};
