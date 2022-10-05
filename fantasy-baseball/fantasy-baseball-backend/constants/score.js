exports.HITTER_INNING_RECORD_CATEGORY = {
  PA: 1,
  SINGLE: 10,
  DOUBLE: 20,
  TRIPLE: 30,
  HR: 50,
  SH: 5,
  BB: 5,
  IBB: 10,
  Out: -5,
  SO: -10,
  CH: 100,
};

exports.HITTER_SPECIAL_RECORD_CATEGORY = {
  WH: 20,
  RO: -5,
  SB: 10,
  DP: -10,
  CS: -5,
  Err: -10,
};

exports.HITTER_SUMMARY = {
  RBI: 10,
  R: 5,
};

exports.PITCHER_SPECIAL_RECORD = {
  WP: -5,
  BK: -5,
  QS: 10,
  QSP: 20,
  SHO: 50,
  CG: 25,
  NHG: 100,
  PFG: 200,
};

exports.PITCHER_SUMMARY = {
  Wgs: 125,
  L: -25,
  IP: 12,
  H: -7,
  HR: -10,
  BB: -5,
  SO: 10,
  R: -5,
  ER: -10,
};

exports.POSITIONS = ["1루수", "2루수", "3루수", "유격수", "지명타자", "좌익수", "중견수", "우익수", "포수"];

exports.RECORD_FILTER = {
  findSingle: /안$/,
  findDouble: /2$/,
  findTriple: /3$/,
  findIBB: /고4/,
  findHR: /홈$/,
  findBB: /구$/,
  findSH: /^.{1}[희]/,
  findOut: /땅|비|직|파|번$/,
  findSO: /삼진/,
  findWH: /결승타/,
  findRO: /주루사|견제사/,
  findDP: /병살타/,
  findSB: /도루/,
  findCS: /도루자/,
  findErr: /실책/,
};
