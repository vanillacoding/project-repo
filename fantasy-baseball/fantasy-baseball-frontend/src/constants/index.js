export const SLOT_POSITIONS = [
  {
    position: "leftFielder",
    title: "Left Fielder",
    wrapperGridArea: "2 / 2 / span 4 / span 4",
    cardGridArea: "4 / 4 / span 5 / span 5",
    rowStart: 3,
    columnStart: 4,
  },
  {
    position: "centerFielder",
    title: "Center Fielder",
    wrapperGridArea: "2 / 5 / span 4 / span 4",
    cardGridArea: "2 / 6 / span 5 / span 5",
    rowStart: 1,
    columnStart: 6,
  },
  {
    position: "rightFielder",
    title: "Right Fielder",
    wrapperGridArea: "2 / 9 / span 4 / span 4",
    cardGridArea: "4 / 4 / span 5 / span 5",
    rowStart: 3,
    columnStart: 4,
  },
  {
    position: "shortStop",
    title: "Short Stop",
    wrapperGridArea: "4 / 4 / span 4 / span 4",
    cardGridArea: "3 / 4 / span 5 / span 5",
    rowStart: 2,
    columnStart: 4,
  },
  {
    position: "secondBaseman",
    title: "2nd Baseman",
    wrapperGridArea: "4 / 6 / span 4 / span 4",
    cardGridArea: "3 / 8 / span 5 / span 5",
    rowStart: 2,
    columnStart: 8,
  },
  {
    position: "thirdBaseman",
    title: "3rd Baseman",
    wrapperGridArea: "6 / 2 / span 4 / span 4",
    cardGridArea: "3 / 4 / span 5 / span 5",
    rowStart: 2,
    columnStart: 4,
  },
  {
    position: "pitcher",
    title: "Pitcher",
    wrapperGridArea: "6 / 5 / span 4 / span 4",
    cardGridArea: "3 / 6 / span 5 / span 5",
    rowStart: 2,
    columnStart: 6,
  },
  {
    position: "firstBaseman",
    title: "1st Baseman",
    wrapperGridArea: "6 / 9 / span 4 / span 4",
    cardGridArea: "3 / 4 / span 5 / span 5",
    rowStart: 2,
    columnStart: 4,
  },
  {
    position: "catcher",
    title: "CATCHER",
    wrapperGridArea: "9 / 5 / span 4 / span 4",
    cardGridArea: "3 / 6 / span 5 / span 5",
    rowStart: 2,
    columnStart: 6,
  },
  {
    position: "designatedHitter",
    title: "DESIGNATED HITTER",
    wrapperGridArea: "9 / 7 / span 4 / span 4",
    cardGridArea: "3 / 6 / span 5 / span 5",
    rowStart: 2,
    columnStart: 6,
  },
];

export const EMPTY_ROASTER = {
  leftFielder: {
    name: null,
  },
  centerFielder: {
    name: null,
  },
  rightFielder: {
    name: null,
  },
  firstBaseman: {
    name: null,
  },
  secondBaseman: {
    name: null,
  },
  thirdBaseman: {
    name: null,
  },
  shortStop: {
    name: null,
  },
  pitcher: {
    name: null,
  },
  catcher: {
    name: null,
  },
  designatedHitter: {
    name: null,
  },
};

export const PLAYER_POSITIONS = {
  좌익수: "leftFielder",
  중견수: "centerFielder",
  우익수: "rightFielder",
  "1루수": "firstBaseman",
  "2루수": "secondBaseman",
  "3루수": "thirdBaseman",
  유격수: "shortStop",
  투수: "pitcher",
  포수: "catcher",
  지명타자: "designatedHitter",
};

export const GAME_START_TIME = {
  weekdays: "18:30:00",
  saturday: "17:00:00",
  sunday: "14:00:00",
};

export const BETTING_END_TIME = {
  weekdays: "19:30:00",
  saturday: "18:00:00",
  sunday: "15:00:00",
};

export const RANKING_TAB_CONTENT = {
  users: {
    title: "유저 랭킹 TOP5",
    list: [],
    error: null,
  },
  pitchers: {
    title: "투수 랭킹 TOP5",
    list: [],
    error: null,
  },
  hitters: {
    title: "타자 랭킹 TOP5",
    list: [],
    error: null,
  },
};

export const RANKING_TABS = [
  {
    name: "users",
    isActive: true,
  },
  {
    name: "pitchers",
    isActive: false,
  },
  {
    name: "hitters",
    isActive: false,
  },
];

export const STATISTIC_TAB_CONTENT = {
  pitcher: [1],
  firstBaseman: [2],
  secondBaseman: [3],
  thirdBaseman: [4],
  shortStop: [5],
  leftFielder: [6],
  centerFielder: [7],
  rightFielder: [8],
  catcher: [9],
  designatedHitter: [10],
};

export const STATISTIC_TABS = [
  {
    name: "firstBaseman",
    title: "1루수",
    isActive: true,
  },
  {
    name: "secondBaseman",
    title: "2루수",
    isActive: false,
  },
  {
    name: "thirdBaseman",
    title: "3루수",
    isActive: false,
  },
  {
    name: "shortStop",
    title: "유격수",
    isActive: false,
  },
  {
    name: "leftFielder",
    title: "좌익수",
    isActive: false,
  },
  {
    name: "centerFielder",
    title: "중견수",
    isActive: false,
  },
  {
    name: "rightFielder",
    title: "우익수",
    isActive: false,
  },
  {
    name: "pitcher",
    title: "투수",
    isActive: false,
  },
  {
    name: "catcher",
    title: "포수",
    isActive: false,
  },
  {
    name: "designatedHitter",
    title: "지명타자",
    isActive: false,
  },
];
