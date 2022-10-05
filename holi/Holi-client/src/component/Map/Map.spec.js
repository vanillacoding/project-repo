import React from 'react';
import { shallow } from 'enzyme';
import Map from './Map';

const actions = {
  onSetCountry: jest.fn(),
  user: {
    id: 'qwertyuiopasdfghjklzxcvbnm2',
    email: 'test2@gmail.com',
    picture: 'https://picture.com/photos/2',
    name: 'test user2'
  },
  onSetUser: jest.fn()
};

const wrapper = shallow(<Map {...actions} />);

describe('<Map />', () => {
  it('Map should be rendered', () => {
    const svg = <svg></svg>;
    expect(wrapper.contains(svg)).toEqual(true);
  });
});
