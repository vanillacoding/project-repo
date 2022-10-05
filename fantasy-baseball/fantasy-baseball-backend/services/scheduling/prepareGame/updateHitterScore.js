const {
  HITTER_SPECIAL_RECORD_CATEGORY,
  HITTER_INNING_RECORD_CATEGORY,
  HITTER_SUMMARY,
  RECORD_FILTER,
} = require("../../../constants/score");
const Statistic = require("../../../models/Statistic");
const logger = require("../../../config/winston");

const {
  PA,
  SINGLE,
  DOUBLE,
  TRIPLE,
  HR,
  SH,
  BB,
  IBB,
  Out,
  SO,
  CH,
} = HITTER_INNING_RECORD_CATEGORY;

const {
  WH,
  RO,
  SB,
  DP,
  CS,
  Err,
} = HITTER_SPECIAL_RECORD_CATEGORY;

const {
  RBI,
  R,
} = HITTER_SUMMARY;

const {
  findSingle,
  findDouble,
  findTriple,
  findIBB,
  findHR,
  findBB,
  findSH,
  findOut,
  findSO,
  findWH,
  findRO,
  findDP,
  findSB,
  findCS,
  findErr,
} = RECORD_FILTER;

const calculateHitterScore = (record) => {
  const hitForTheCycle = {
    HR: false,
    SINGLE: false,
    DOUBLE: false,
    TRIPLE: false,
  };

  const parsedRecord = Object.fromEntries(
    Object
      .entries(record.summary)
      .map(([key, value]) => [key, parseInt(value, 10)])
  );

  const { runsBattedIn, runsScored } = parsedRecord;

  let score = record.inningRecords
    .filter((inningRecord) => !!inningRecord)
    .flatMap((inningRecord) => (
      inningRecord.split("/")
        .map((splittedRecord) => splittedRecord.trim())
    ))
    .reduce((totalScore, inningRecord) => {
      if (findSingle.test(inningRecord)) {
        hitForTheCycle.SINGLE = true;
        return totalScore + SINGLE + PA;
      }

      if (findDouble.test(inningRecord)) {
        hitForTheCycle.DOUBLE = true;
        return totalScore + DOUBLE + PA;
      }

      if (findTriple.test(inningRecord)) {
        hitForTheCycle.TRIPLE = true;
        return totalScore + TRIPLE + PA;
      }

      if (findIBB.test(inningRecord)) {
        return totalScore + IBB + PA;
      }

      if (findBB.test(inningRecord)) {
        return totalScore + BB + PA;
      }

      if (findHR.test(inningRecord)) {
        hitForTheCycle.HR = true;
        return totalScore + HR + PA;
      }

      if (findSH.test(inningRecord)) {
        return totalScore + SH + PA;
      }

      if (findOut.test(inningRecord)) {
        return totalScore + Out + PA;
      }

      if (findSO.test(inningRecord)) {
        return totalScore + SO + PA;
      }

      return totalScore + PA;
    }, 0);

  if (record.specialRecords) {
    score += record.specialRecords
      .reduce((totalScore, specialRecord) => {
        if (findWH.test(specialRecord)) {
          return totalScore + WH;
        }
        if (findRO.test(specialRecord)) {
          return totalScore + RO;
        }
        if (findDP.test(specialRecord)) {
          return totalScore + DP;
        }
        if (findSB.test(specialRecord)) {
          return totalScore + SB;
        }
        if (findCS.test(specialRecord)) {
          return totalScore + CS;
        }
        if (findErr.test(specialRecord)) {
          return totalScore + Err;
        }

        return totalScore;
      }, 0);
  }

  score += runsBattedIn * RBI;
  score += runsScored * R;

  if (hitForTheCycle.HR
      && hitForTheCycle.SINGLE
      && hitForTheCycle.DOUBLE
      && hitForTheCycle.TRIPLE
  ) {
    score += CH;
  }

  return score;
};

const updateHitterScore = async (gameDate, session) => {
  try {
    logger.info(`Start: update hitter score ${gameDate}`);

    const hitters = await Statistic
      .find(
        {
          gameDate,
          playerType: "hitter",
        },
        null,
        { session }
      )
      .lean();

    hitters.forEach(async (hitter) => {
      const { record, _id } = hitter;
      const score = calculateHitterScore(record);

      await Statistic.findOneAndUpdate(
        { _id },
        { score },
        { session }
      );
    });

    logger.info(`Success: update hitter score ${gameDate}`);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

module.exports = updateHitterScore;
