import React from 'react';
import { mount } from 'enzyme';
import FinalScore from '../FinalScore';

describe('<FinalScore/> component', () => {
  const props = {
    score: { user1: 10, user2: 20 },
    userId: 'some userId',
    gameId: 'some gameId'
  };

  it('should display player\'s score', () => {
    const wrapper = mount(<FinalScore {...props} />);
    expect(wrapper.find('h1')).toHaveLength(2);
    expect(wrapper.find('h2')).toHaveLength(2);
    expect(wrapper.find('h1').first().text()).toEqual('user2');
    expect(wrapper.find('h2').first().text()).toEqual('20');
    expect(wrapper.find('h1').at(1).text()).toEqual('user1');
    expect(wrapper.find('h2').at(1).text()).toEqual('10');
    expect(wrapper.find('button').text()).toEqual('Confirm');
  });
});
