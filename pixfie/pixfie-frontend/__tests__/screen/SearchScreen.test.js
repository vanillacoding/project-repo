import React from 'react';
import { shallow } from 'enzyme';

import { SearchScreen } from '../../src/components/screens/SearchScreen';
import { Results } from '../../src/components/screens/SearchScreen';
import * as api from '../../src/utils/api';
import * as util from '../../src/utils/index';

jest.useFakeTimers();

const fetchKeywordSpy = jest.spyOn(api, 'fetchKeyword');

const props = {
  keyword: 'abc', 
  loggedIn: { user: { _id: '123' } },
  users: [{ profile_url: 'abc', user_id: 'test', user_name: 'name' }], 
  setSearchKeyword: jest.fn(), 
  setSearchResults: jest.fn(),
  setSearchedUser: jest.fn(),
  clearStates: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

const resultProps = {
  users: ['a', 'b', 'c'],
  setSearchKeyword: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
}

const setup = (props) => {
  const enzymeWrapper = shallow(<SearchScreen {...props} />);
  
  return {
    props,
    enzymeWrapper,
  };
};

const resultSetup = (props) => {
  const enzymeWrapper = shallow(<Results {...props} />);

  return {
    props,
    enzymeWrapper,
  };
};

describe('Ready Screen', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(props);

    expect(enzymeWrapper.find('View').length).toBe(1);
    expect(enzymeWrapper.find('Header').length).toBe(1);
    expect(enzymeWrapper.find('TextInput').length).toBe(1);
    expect(enzymeWrapper.find('Results').length).toBe(1);
  });

  it('should call function when TextInput value changed', () => {
    const enzymeWrapper = shallow(<SearchScreen {...props} fetchKeyword={fetchKeywordSpy} />);

    enzymeWrapper.find('TextInput').at(0).props().onChangeText();
    expect(fetchKeywordSpy.mock.calls.length).toBe(1);
  });
});

describe('Results Screen', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = resultSetup(resultProps);

    expect(enzymeWrapper.find('View').length).toBe(4);
    expect(enzymeWrapper.find('Image').length).toBe(3);
    expect(enzymeWrapper.find('TouchableOpacity').length).toBe(3);
    expect(enzymeWrapper.find('Text').length).toBe(6);
  });

  it('should call function when button pressed', () => {
    const setSearchedUser = jest.fn();
    const navigation = { navigate: jest.fn() };
    const { enzymeWrapper } = resultSetup({ ...resultProps, setSearchedUser, navigation });

    enzymeWrapper.find('TouchableOpacity').at(0).props().onPress();
    expect(setSearchedUser.mock.calls.length).toBe(1);
    expect(navigation.navigate.mock.calls.length).toBe(1);
  });
});
