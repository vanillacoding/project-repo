import React from 'react';
import { mount } from 'enzyme';
import PlayerCard from '../PlayerCard';

describe('<PlayerCard /> component', () => {
  const props = {
    userId: 'some user id',
    username: 'some username',
    score: 10,
    isReady: true,
    hasScored: false
  };

  it('should render player status', () => {
    const wrapper = mount(<PlayerCard {...props} />);
    expect(wrapper.find('[data-id="some user id"]').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toEqual('SOME USERNAME');
    expect(wrapper.find('h4').text()).toEqual('10 points');
  });
});
