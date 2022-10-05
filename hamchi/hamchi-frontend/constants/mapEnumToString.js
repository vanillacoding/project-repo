const hamsterType = {
  Syrian: '골든',
  Jungle: '드워프',
  Robo: '로보',
  other: '그 외'
};

const hamsterGender = {
  male: '수컷',
  female: '암컷',
  other: '알 수 없음'
};

const experienceType = {
  none: '없음',
  one: '한번',
  many: '두번 이상'
};

const status = {
  opened: '분양 진행중',
  closed: '분양 완료'
};

const enumToString = {
  hamsterType,
  hamsterGender,
  experienceType,
  status
};

export default enumToString;
