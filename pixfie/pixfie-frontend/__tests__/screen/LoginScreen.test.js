import React from 'react';
import { shallow } from 'enzyme';

import { LoginScreen } from '../../src/components/screens/LoginScreen';

jest.useFakeTimers();

const props = {
  loginInfo: {
    user_id: 'test',
    password: 'password'
  },
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

const setup = (props) => {
  const enzymeWrapper = shallow(<LoginScreen {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe('Login Screen', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(props);

    expect(enzymeWrapper.find('View').length).toBe(2);
    expect(enzymeWrapper.find('Text').length).toBe(3);
    expect(enzymeWrapper.find('TextInput').length).toBe(2);
    expect(enzymeWrapper.find('TouchableOpacity').length).toBe(2);
  });

  it('should call function when button pressed', () => {
    const navigation = { navigate: jest.fn() };
    const { enzymeWrapper } = setup({ ...props, navigation });

    enzymeWrapper.find('TouchableOpacity').at(1).props().onPress();
    expect(navigation.navigate.mock.calls.length).toBe(1);
  });

  it('should call function when input value is changed', () => {
    const handleChange = jest.fn();
    const { enzymeWrapper } = setup({ ...props, handleChange });

    enzymeWrapper.find('TextInput').at(0).props().onChangeText('waffles');
    expect(handleChange.mock.calls.length).toBe(1);
    expect(handleChange).toHaveBeenCalledWith('user_id', 'waffles');

    enzymeWrapper.find('TextInput').at(1).props().onChangeText('waffles');
    expect(handleChange.mock.calls.length).toBe(2);
    expect(handleChange).toHaveBeenCalledWith('password', 'waffles');
  });
});
