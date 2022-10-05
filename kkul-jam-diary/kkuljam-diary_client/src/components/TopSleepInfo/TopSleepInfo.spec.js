import React from 'react';
import { shallow } from 'enzyme';
import TopSleepInfo from './TopSleepInfo';

describe('<TopSleepInfo />', () => {
  const sleep = {
    date: '2020.04.23',
    hours: '4시간 5분',
    duration: '3:26 AM ~ 7:31 AM'
  };

  const wrapper = shallow(<TopSleepInfo sleep={sleep} />);

  it('renders TopSleepInfo', () => {
    expect(wrapper.find('.topSleepWarpper')).toHaveLength(1);
    expect(wrapper.find('.topTitle').text()).toEqual('나의 수면시간');
  });

  it('renders sleep data', () => {
    expect(wrapper.find('.topDate').text()).toEqual('2020.04.23');
    expect(wrapper.find('.topHours').text()).toEqual('4시간 5분');
    expect(wrapper.find('.topDuration').text()).toEqual('3:26 AM ~ 7:31 AM');
  });
});
