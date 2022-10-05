import React from 'react';
import { shallow } from 'enzyme';
import RemainingTime from '../components/RemainingTime';
import { TimeText } from '../shared/index';

describe('RemainingTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render time by expireTime props', () => {
    const FAKE_EXPIED_TIME = new Date(Date.now() + 60 * 1000);

    const wrapper = shallow(<RemainingTime expiredTime={FAKE_EXPIED_TIME} />);
    const timeText = wrapper.find(TimeText);

    jest.runTimersToTime(1000);

    expect(timeText.text()).toEqual('59:59');
  });

  it('shoud show different size by props', () => {
    let MOCK_SIZE = '50px';
    let wrapper = shallow(<RemainingTime size={MOCK_SIZE} />);
    let timeText = wrapper.find(TimeText);

    expect(timeText.props().size).toBe(MOCK_SIZE);

    MOCK_SIZE = '30px';

    wrapper = shallow(<RemainingTime size={MOCK_SIZE} />);
    timeText = wrapper.find(TimeText);

    expect(timeText.props().size).toBe(MOCK_SIZE);
  });
});
