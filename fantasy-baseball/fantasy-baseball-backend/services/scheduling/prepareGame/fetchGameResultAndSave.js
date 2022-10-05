const { startSession } = require("mongoose");
const Game = require("../../../models/Game");
const Statistic = require("../../../models/Statistic");
const fetchGameResult = require("../../fetchGameInfoFromKBO/fetchGameResult");
const logger = require("../../../config/winston");

const updatePlayerStatistic = async (records, gameDate, isHitter, session) => {
  const recordsByRole = Object.entries(records);

  const result = await Promise.all(
    recordsByRole.map(([player, playerInfo]) => {
      const { team, position } = playerInfo;
      const nameRegex = new RegExp(player);

      const toBeUpdatedRecord = isHitter
        ? {
          specialRecords: playerInfo.specialRecords,
          inningRecords: playerInfo.inningRecords,
          summary: playerInfo.summary,
        } : {
          specialRecords: playerInfo.specialRecords,
          summary: playerInfo.record,
        };

      return (
        Statistic.findOneAndUpdate(
          {
            name: { $regex: nameRegex },
            team,
            position,
            gameDate,
          },
          {
            record: toBeUpdatedRecord,
          },
          { session }
        ).lean()
      );
    })
  );

  return result.filter((statistic) => !!statistic);
};

module.exports = async (gameDate) => {
  logger.info("Start: fetch game result and save");

  const session = await startSession();

  try {
    session.startTransaction();

    const currentGames = await Game.find({ gameDate });
    const gameIds = currentGames
      .flatMap((game) => game.schedule)
      .map((schedule) => schedule.gameId);

    const gameResults = await fetchGameResult(gameIds);
    logger.info(`Log: fetch ${gameDate} game result`);

    const hittersRecords = {};
    const pitchersRecords = {};

    const positions = {
      포: "포수",
      一: "1루수",
      二: "2루수",
      三: "3루수",
      유: "유격수",
      좌: "좌익수",
      우: "우익수",
      중: "중견수",
      지: "지명타자",
      주: "대주자",
      타: "대타",
    };

    for (let i = 0; i < gameResults.length; i += 1) {
      const { gameSummary, playersRecord } = gameResults[i];
      const specialRecordsByPlayer = Object.entries(gameSummary);

      for (let j = 0; j < specialRecordsByPlayer.length; j += 1) {
        const [player, specialRecords] = specialRecordsByPlayer[j];

        if (specialRecords[0] === "폭투" || specialRecords[0] === "보크") {
          pitchersRecords[player] = {};
          pitchersRecords[player].specialRecords = specialRecords;
        } else {
          hittersRecords[player] = {};
          hittersRecords[player].specialRecords = specialRecords;
        }
      }

      const { hitters, pitchers } = playersRecord;
      const recordsByHitter = Object.entries(hitters);
      const recordsByPitcher = Object.entries(pitchers);

      for (let j = 0; j < recordsByHitter.length; j += 1) {
        const [player, playerInfo] = recordsByHitter[j];
        const {
          record,
          summary,
          team,
          position,
        } = playerInfo;

        if (!hittersRecords[player]) {
          hittersRecords[player] = {};
        }

        hittersRecords[player].team = team;
        hittersRecords[player].position = positions[position[0]];
        hittersRecords[player].inningRecords = record;
        hittersRecords[player].summary = summary;
      }

      for (let j = 0; j < recordsByPitcher.length; j += 1) {
        const [player, playerInfo] = recordsByPitcher[j];
        const { team, record } = playerInfo;

        if (!pitchersRecords[player]) {
          pitchersRecords[player] = {};
        }

        pitchersRecords[player].position = "투수";
        pitchersRecords[player].team = team;
        pitchersRecords[player].record = record;
      }
    }

    const hitterStatistics = await updatePlayerStatistic(
      hittersRecords,
      gameDate,
      true,
      session
    );
    logger.info(`Log: save ${hitterStatistics.length} hitter statistic`);

    const pitcherStatistics = await updatePlayerStatistic(
      pitchersRecords,
      gameDate,
      false,
      session
    );
    logger.info(`Log: save ${pitcherStatistics.length} pitcher statistic`);

    await Promise.all(currentGames.map(
      (game) => game.updateOne(
        { hasResult: true },
        { session }
      )
    ));

    await session.commitTransaction();
    logger.info(`Success: ${hitterStatistics.length + pitcherStatistics.length} player results are saved`);

    return true;
  } catch (err) {
    await session.abortTransaction();
    logger.error(err);

    return false;
  } finally {
    session.endSession();
  }
};
