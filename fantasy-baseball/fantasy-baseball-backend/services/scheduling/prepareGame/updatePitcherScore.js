const {
  PITCHER_SUMMARY,
  PITCHER_SPECIAL_RECORD,
} = require("../../../constants/score");
const Statistic = require("../../../models/Statistic");
const logger = require("../../../config/winston");

const {
  Wgs,
  L,
  IP,
  H,
  HR,
  BB,
  SO,
  R,
  ER,
} = PITCHER_SUMMARY;

const {
  WP,
  BK,
  QS,
  QSP,
  SHO,
  CG,
  NHG,
  PFG,
} = PITCHER_SPECIAL_RECORD;

const calculatePitcherScore = (record) => {
  const { specialRecords, summary } = record;
  const { result } = summary;

  const parsedRecord = Object.fromEntries(
    Object.entries(summary)
      .map(([key, value]) => [key, parseInt(value, 10)])
  );
  const {
    inning,
    hits,
    homerun,
    baseOnBalls,
    strikeOuts,
    runs,
    earnedRuns,
  } = parsedRecord;

  let score = 0;

  score += inning * IP;
  score += hits * H;
  score += homerun * HR;
  score += baseOnBalls * BB;
  score += strikeOuts * SO;
  score += runs * R;
  score += earnedRuns * ER;

  if (specialRecords) {
    score = specialRecords
      .reduce((totalScore, specialRecord) => {
        if (specialRecord === "폭투") {
          return totalScore + WP;
        }

        if (specialRecord === "보크") {
          return totalScore + BK;
        }

        return totalScore;
      }, 0);
  }

  if (earnedRuns < 4) {
    if (inning > 5) score += QS;
    if (inning > 6) score += QSP;
  }

  if (inning === 9) {
    if (runs === 0) score += SHO;
    score += CG;
  }

  if (inning === 9
      && result === "승"
      && runs === 0
      && earnedRuns === 0
      && hits === 0
  ) {
    if (baseOnBalls === 0) score += PFG;
    score += NHG;
  }

  if (result === "승") {
    score += Wgs;
  }

  if (result === "패") {
    score += L;
  }

  return score;
};

const updatePitcherScore = async (gameDate, session) => {
  try {
    logger.info(`Start: update pitcher score ${gameDate}`);

    const pitchers = await Statistic
      .find(
        {
          gameDate,
          playerType: "pitcher",
        },
        null,
        { session }
      )
      .lean();

    pitchers.forEach(async (pitcher) => {
      const { record, _id } = pitcher;
      const score = calculatePitcherScore(record);

      await Statistic.findOneAndUpdate(
        { _id },
        { score },
        { session }
      );
    });

    logger.info(`Success: update pitcher score ${gameDate}`);

    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

module.exports = updatePitcherScore;
