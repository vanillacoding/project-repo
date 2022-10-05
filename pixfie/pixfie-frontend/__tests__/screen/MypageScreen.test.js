import React from 'react';
import { shallow } from 'enzyme';

import { MypageScreen } from '../../src/components/screens/MypageScreen';
import * as api from '../../src/utils/api';

jest.useFakeTimers();

const handleFollowSpy = jest.spyOn(api, 'handleFollow');

const props = { 
  loggedIn: {
    user:
    {
      _id: '123',
      user_id: 'waffles',
      user_name: 'waffles',
      followers: ['a', 'b', 'c'],
      followings: ['a', 'b', 'c'],
    }
  }, 
  searchedUser: {
    _id: '123',
    user_id: 'waffles',
    user_name: 'waffles',
    followers: ['a', 'b', 'c'],
    followings: ['a', 'b', 'c'],
  }, 
  setSearchedUser: jest.fn(), 
  userPortraits: ['a', 'b', 'c'], 
  setUserPortraits: jest.fn(), 
  setDropdownStatus: jest.fn(), 
  route: { params: false }, 
  navigation: { navigate: jest.fn() }
};

const setup = (props) => {
  const enzymeWrapper = shallow(<MypageScreen {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe('Mypage Screen when Mypage is true', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(props);

    expect(enzymeWrapper.find('View').length).toBe(7);
    expect(enzymeWrapper.find('Text').length).toBe(6);
    expect(enzymeWrapper.find('Image').length).toBe(1);
    expect(enzymeWrapper.find('TouchableOpacity').length).toBe(0);
  });
});

describe('Mypage Screen when Mypage is false', () => {
  it('should render self and subcomponents', () => {
    const newProps = { ...props, route: { params: true } };
    const { enzymeWrapper } = setup(newProps);

    expect(enzymeWrapper.find('View').length).toBe(7);
    expect(enzymeWrapper.find('Text').length).toBe(7);
    expect(enzymeWrapper.find('Image').length).toBe(1);
    expect(enzymeWrapper.find('TouchableOpacity').length).toBe(1);
  });

  it('should call function when button pressed', () => {
    const newProps = { ...props, route: { params: true } };
    const enzymeWrapper = shallow(<MypageScreen {...newProps} handleFollow={handleFollowSpy} />);

    enzymeWrapper.find('TouchableOpacity').at(0).props().onPress();
    expect(handleFollowSpy.mock.calls.length).toBe(1);
  });
});
