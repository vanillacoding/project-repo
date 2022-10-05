import React from 'react';
import { shallow } from 'enzyme';

import { SignupScreen } from '../../src/components/screens/SignupScreen';

jest.useFakeTimers();

const props = {
  signupInfo: {
    user_id: 'test',
    user_name: 'testname',
    password: 'password',
    passwordCheck: 'password'
  },
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

const setup = (props) => {
  const enzymeWrapper = shallow(<SignupScreen {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe('Signup Screen', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(props);

    expect(enzymeWrapper.find('View').length).toBe(2);
    expect(enzymeWrapper.find('Text').length).toBe(2);
    expect(enzymeWrapper.find('TextInput').length).toBe(4);
    expect(enzymeWrapper.find('TouchableOpacity').length).toBe(1);
  });

  it('should call function when input value is changed', () => {
    const handleChange = jest.fn();
    const { enzymeWrapper } = setup({ ...props, handleChange });

    enzymeWrapper.find('TextInput').at(0).props().onChangeText('waffles');
    expect(handleChange.mock.calls.length).toBe(1);
    expect(handleChange).toHaveBeenCalledWith('user_id', 'waffles');

    enzymeWrapper.find('TextInput').at(1).props().onChangeText('waffle name');
    expect(handleChange.mock.calls.length).toBe(2);
    expect(handleChange).toHaveBeenCalledWith('user_name', 'waffle name');

    enzymeWrapper.find('TextInput').at(2).props().onChangeText('waffle password');
    expect(handleChange.mock.calls.length).toBe(3);
    expect(handleChange).toHaveBeenCalledWith('password', 'waffle password');

    enzymeWrapper.find('TextInput').at(3).props().onChangeText('waffle password');
    expect(handleChange.mock.calls.length).toBe(4);
    expect(handleChange).toHaveBeenCalledWith('password', 'waffle password');
  });
});
