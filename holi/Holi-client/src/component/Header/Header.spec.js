import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('<Header />', () => {
  it('Holi logo should be rendered', () => {
    const actions = {
      user: {},
      onSetUser: jest.fn(),
      color: 'white'
    };
    const wrapper = shallow(<Header {...actions} />);

    expect(wrapper.find('.logo > a').text()).toEqual('Holi');
  });

  it('If user has not logged in, login button should be rendered', () => {
    const actions = {
      user: {},
      onSetUser: jest.fn(),
      color: 'white'
    };
    const wrapper = shallow(<Header {...actions} />);

    expect(wrapper.find('.profile')).toHaveLength(0);
    expect(wrapper.find('.button-login')).toHaveLength(1);
  });

  it('If user logs in, profile should be rendered', () => {
    const actions = {
      user: {
        id: 'qwertyuiopasdfghjklzxcvbnm',
        email: 'test@gmail.com',
        picture: 'https://picture.com/photos/1',
        name: 'test user',
      },
      onSetUser: jest.fn(),
      color: 'white'
    };
    const wrapper = shallow(<Header {...actions} />);

    expect(wrapper.find('.profile')).toHaveLength(1);
    expect(wrapper.find('.button-login')).toHaveLength(0);
  });

  it('OnSetUser function should be executed when user click logout button', () => {
    const actions = {
      user: {
        id: 'qwertyuiopasdfghjklzxcvbnm',
        email: 'test@gmail.com',
        picture: 'https://picture.com/photos/1',
        name: 'test user'
      },
      onSetUser: jest.fn(),
      color: 'white'
    };
    const wrapper = shallow(<Header {...actions} />);

    wrapper.find('.gnb ul li:last-child').simulate('click');
    expect(actions.onSetUser).toBeCalled();
  });
});
