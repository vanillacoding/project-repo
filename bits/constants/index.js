const ROUTES = {
  USER: '/user',
  HABIT: '/habit',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ALL: '/all',
  FOLLOW: '/follow',
  IMAGE: '/image',
  PUSH_TOKENS: '/pushTokens',
  FOLLOWING: '/following',
  LIKE: '/like',
  PUSH_URL: 'https://exp.host/--/api/v2/push/send'
};

const NUMBERS = {
  MAXIMUM_LEVEL: 4,
  QUALITY: 1,
  PICKER_SCALE: 0.8,
  DEFAULT_ANIMATION_SPEED: 1,
  TWICE_ANIMATION_SPEED: 2,
  LIKE_ANIMATION_ZINDEX: 1,
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3
};

const NAMES = {
  PLAY_PAUSE_ICON: 'play-pause',
  PLAY_ICON: 'md-play',
  CANCLE_ICON: 'cancel',
  CIRCLE_PLUS_ICON: 'circle-with-plus',
  DELETE_ICON: 'x-circle',
  USER_ICON: 'user',
  MEDAL_ICON: 'medal',
  CROWN_ICON: 'crown',
  CHECK_SQUARE: 'checksquare',
  CHECK_ICON: 'check',
  HEARTBEAT_ICON: 'heartbeat',
  USER_CIRCLE_ICON: 'user-circle',
  LOGOUT_ICON: 'door-open',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  BOTTOM_TAB_NAVIGATOR: 'BottomTabNavigator',
  REGISTER: 'Register',
  HABIT: '습관',
  LIVE: '라이브',
  SEARCH: '검색',
  MYPROFILE: '내정보',
  CODING_ICON: 'codesquare',
  READING_ICON: 'open-book',
  SWIMMING_ICON: 'swimmer',
  MEDITATING_ICON: 'meditation',
  RUNNING_ICON: 'run-fast',
  BICYCLE_ICON: 'bicycle-basket',
  YOGA_ICON: 'yoga',
  CIRCLE_ICON: 'circle',
  PLAY_ICON: 'md-play',
  SEARCH_ICON: 'magnify'
};

const SIZES = {
  LOGO_ICON: 30,
  TIMER_FIRST_RATIO: 0.4,
  TIMER_SECOND_RATIO: 0.4,
  TIMER_THIRD_RATIO: 0.2,
  TIMER: 130,
  TIMER_STROKE_WIDTH: 10,
  TIMER_TEXT: 18,
  TIMER_FONTWEIGHT: '600',
  PLAY_CANCLE: 40,
  CIRCLE_PLUS_ICON: 24,
  PERCENTAGE: 100,
  DELETE_ICON: 20,
  USER_ICON: 50,
  MEDAL_ICON: 30,
  CROWN_ICON: 24,
  TEXT_DAY_FONT: 12,
  CHECK_SQUARE: 20,
  PROFILE_USER_ICON: 100,
  FOLLOW_USER_ICON: 60,
  CHECK_ICON: 24,
  HEARTBEAT_ICON: 24,
  USER_CIRCLE_ICON: 34,
  LOGOUT_ICON: 24,
  CODING_ICON: 40,
  READING_ICON: 40,
  SWIMMING_ICON: 40,
  MEDITATING_ICON: 40,
  RUNNING_ICON: 40,
  BICYCLE_ICON: 50,
  SEARCH_ICON: 20,
  YOGA_ICON: 50,
  CIRCLE_ICON: 18
};

const COLORS = {
  BLACK: 'black',
  WHITE: 'white',
  GRAY: 'gray',
  RED: 'red',
  TIMER_FIRST_RENDER: '#004777',
  TIMER_SECOND_RENDER: '#F7B801',
  TIMER_THIRD_RENDER: '#A30000',
  CROWN_ICON: '#2f3640',
  ARROW: '#F9BC56',
  CHECK_SQUARE: '#4cd137',
  CHECK_ICON: 'green',
  FOLLOW_CIRCLE_PLUS_ICON: '#E8BE64',
  BOTTOM_TAB_ACTIVE: '#F48D3B',
  BOTTOM_TAB_BACKGROUND: '#FFF0D9',
  ANDROID_LIGHT: '#FF231F7C',
  LOADING_ANIMATION_BACKGROUND: '#F9BC56',
  FIRST_LEVEL: '#fff200',
  SECOND_LEVEL: '#4cd137',
  THIRD_LEVEL: '#00a8ff',
  FOURTH_LEVEL: '#7f8fa6',
  LIGHT_GREEN: '#4cd137'
};

const STRINGS = {
  EMPTY: '',
  TWO: '2',
  SEVEN: '7',
  FOURTEEN: '14',
  TWENTYONE: '21',
  TWENTYEIGHT: '28',
  SEC: 's',
  MIN: 'm',
  HOUR: 'h',
  FR: 'fr',
  EMAIL: 'EMAIL',
  PW: 'PW',
  BITS: 'Bits',
  NAME: 'NAME',
  NONE: 'none',
  CHECK: 'CHECK',
  LOGIN_EN: 'login',
  LOGIN_FAIL: 'loginFail',
  SIGNUP_EN: 'signup',
  BOLD: 'bold',
  SLIDE: 'slide',
  CENTER: 'center',
  DISABLED: 'disabled',
  PRESS_HABIT: 'PRESS HABIT',
  INVALID_EMAIL: 'invalidEmail',
  PASSWORD_MISMATCH: 'passwordMismatch',
  CODE: 'code',
  READ: 'read',
  SWIM: 'swim',
  MEDITATE: 'meditate',
  RUN: 'run',
  BICYCLE: 'bicycle',
  YOGA: 'yoga',
  ACT: 'Act',
  DAY: 'Day',
  TIME: 'Time',
  BITS: 'BiTS',
  GRANTED: 'granted',
  DEFAULT: 'default',
  ANDROID: 'android',
  RESIZE_MODE_COVER: 'cover',
  PROGRESSING: '진행중',
  COMPLETED: '완료',
  CALENDAR: '달력',
  CONFIRM: '확인',
  REGISTER: '등록',
  SECOND: ' 초',
  SEARCH: '검색',
  LOGIN: '로그인',
  SIGNUP: '회원가입',
  CODE_KR: '코딩',
  READ_KR: '독서',
  SWIM_KR: '수영',
  MEDITATE_KR: '명상',
  RUN_KR: '달리기',
  BICYCLE_KR: '자전거',
  YOGA_KR: '요가',
  SEARCH_FRIEND: '친구검색'
};

const MONTHS = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const DAYS = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일'
];

const SHORTNAMES = [
  '일',
  '월',
  '화',
  '수',
  '목',
  '금',
  '토'
];

const PATTERN = [0, 250, 250, 250];

const ASPECT = [4, 3];

const LABEL = {
  CODE: 'Code',
  READ: 'Read',
  SWIM: 'Swim',
  MEDITATE: 'Meditate',
  RUN: 'Run',
  BICYCLE: 'Bicycle',
  YOGA: 'Yoga',
  TWO_DAYS: '2 days',
  SEVEN_DAYS: '7 days',
  FOURTEEN_DAYS: '14 days',
  TWENTYONE_DAYS: '21 days',
  TWENTYEIGHT_DAYS: '28 days',
  THREE_SEC: '3 s',
  TEN_SEC: '10 s',
  TEN_MIN: '10 m',
  THIRTY_MIN: '30 m',
  ONE_HOUR: '1 h'
};

const MESSAGE = {
  PUSH_TOKEN_FAIL: 'Failed to get push token for push notification!',
  PUSH_TOKEN_ERR: 'Must use physical device for Push Notifications',
  NO_REGISTERED_MATE: '등록된 메이트가 없습니다',
  FOLLOW_NEW_MATE: '새로운 메이트를 추가해보세요',
  CHECK_INPUT: '입력 정보를 다시 확인해주세요',
  REGISTER_ALL_INFOS: '모든 정보를 입력해주세요',
  INVALID_EMAIL_FORM: '올바른 이메일 형식이 아닙니다',
  PASSWORD_MISMATCH_KR: '비밀번호가 일치하지 않습니다',
  TYPE_EMAIL: '아이디를 입력해주세요',
  TYPE_USERNAME: '이름을 입력해주세요',
  TYPE_PASSWORD: '비밀번호를 입력해주세요',
  TYPE_CONFIRM_PASSWORD: '비밀번호를 확인해주세요',
  REGISTER_HABIT: '습관을 등록해주세요',
  NO_PROGRESSING_HABIT: '진행중인 습관이 없습니다',
  NO_COMPLETED_HABIT: '완료된 습관이 없습니다',
  ALREADY_REGISTERED_HABIT: '이미 등록된 습관입니다'
};

const TESTID = {
  REGISTER_PAGE_ICON: 'registerPageIcon'
};

export {
  ROUTES,
  NUMBERS,
  NAMES,
  SIZES,
  COLORS,
  STRINGS,
  MONTHS,
  DAYS,
  SHORTNAMES,
  PATTERN,
  ASPECT,
  LABEL,
  MESSAGE,
  TESTID
};
