import { meetings } from './meetings';

const initialState = {
  waitingMeetings: [],
  selectedMeeting: {
    meetingId: '',
    restaurantId: '',
    restaurantName: '',
    restaurantLocation: {
      latitude: 0,
      longitude: 0,
    },
    partnerNickname: '',
    expiredTime: '',
  },
  currentMeeting: {
    meetingId: '',
    users: [],
    arrivalCount: 0,
  },
};

// [mockData]
const mockDataOne = [
  {
    meetingId: 'ekajrlkejralek122',
    restaurantId: 'asdassad2212ce',
    restaurantName: '부타이',
    partnerNickname: '뀨릉이',
  },
  {
    meetingId: 'esaskejralek122',
    restaurantId: 'ssad22zzzz12ce',
    restaurantName: '부엉이 돈까스',
    partnerNickname: '레모니',
  },
];

const mockDataTwo = [
  {
    meetingId: 'ekajrlkejralek122',
    restaurantId: 'asdassad2212ce',
    restaurantName: '부타이',
    partnerNickname: '뀨릉이',
  },
];

const mockDataThree = {
  meetingId: 'asduhjk23asdas',
  restaurantId: 'asasdkash33as',
  restaurantName: '부타이',
  restaurantLocation: {
    latitude: 23.234982334,
    longitude: 123.3432432,
  },
  partnerNickname: '부타이',
  expiredTime: new Date(),
};

const mockDataFour = {
  meetingId: '',
  users: ['aasdq323', 'asdas3fas'],
  arrivalCount: 0,
};

// [mockAction]
const actionWaitingMeetingsOne = {
  type: 'SET_WAITING_MEETINGS',
  payload: mockDataOne,
};

const actionWaitingMeetingsTwo = {
  type: 'SET_WAITING_MEETINGS',
  payload: mockDataTwo,
};

const actionSeletedMeetings = {
  type: 'SET_SELECTED_MEETING',
  payload: mockDataThree,
};

const actionCurrentMeetings = {
  type: 'SET_CURRENT_MEETING',
  payload: mockDataFour,
};

const actionResetMeeting = {
  type: 'RESET_MEETING',
};

//[mockState]
const stateWaitingMeetingsOne = {
  waitingMeetings: mockDataOne,
  selectedMeeting: {
    meetingId: '',
    restaurantId: '',
    restaurantName: '',
    restaurantLocation: {
      latitude: 0,
      longitude: 0,
    },
    partnerNickname: '',
    expiredTime: '',
  },
  currentMeeting: {
    meetingId: '',
    users: [],
    arrivalCount: 0,
  },
};

const stateWaitingMeetingsTwo = {
  waitingMeetings: mockDataTwo,
  selectedMeeting: {
    meetingId: '',
    restaurantId: '',
    restaurantName: '',
    restaurantLocation: {
      latitude: 0,
      longitude: 0,
    },
    partnerNickname: '',
    expiredTime: '',
  },
  currentMeeting: {
    meetingId: '',
    users: [],
    arrivalCount: 0,
  },
};

const stateSelectedMeeting = {
  waitingMeetings: [],
  selectedMeeting: mockDataThree,
  currentMeeting: {
    meetingId: '',
    users: [],
    arrivalCount: 0,
  },
};

const stateCurrentMeeting = {
  waitingMeetings: [],
  selectedMeeting: {
    meetingId: '',
    restaurantId: '',
    restaurantName: '',
    restaurantLocation: {
      latitude: 0,
      longitude: 0,
    },
    partnerNickname: '',
    expiredTime: '',
  },
  currentMeeting: mockDataFour,
};

describe('meetings Reducer', () => {
  it('should be stored meetings if action is SET_WAITING_MEETINGS.', () => {
    expect(meetings(initialState, actionWaitingMeetingsOne)).toEqual(
      stateWaitingMeetingsOne
    );
    expect(meetings(stateWaitingMeetingsOne, actionWaitingMeetingsTwo)).toEqual(
      stateWaitingMeetingsTwo
    );
  });

  it('should be stored meetings if action is SET_SELECTED_MEETING.', () => {
    expect(meetings(initialState, actionSeletedMeetings)).toEqual(
      stateSelectedMeeting
    );
  });

  it('should be stored meetings if action is SET_CURRENT_MEETING.', () => {
    expect(meetings(initialState, actionCurrentMeetings)).toEqual(
      stateCurrentMeeting
    );
  });

  it('should reset meetings if action is RESET_MEETING.', () => {
    expect(meetings(stateSelectedMeeting, actionResetMeeting)).toEqual(
      initialState
    );
  });
});
