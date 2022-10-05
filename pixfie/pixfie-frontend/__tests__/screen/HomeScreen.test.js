import React from 'react';
import { shallow, mount } from 'enzyme';

import { HomeScreen } from '../../src/components/screens/HomeScreen';

jest.useFakeTimers();

const props = {
  loggedIn: {
    staus: true,
  },
  fontLoaded: false,
  setPhoto: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

const setup = (props) => {
  const enzymeWrapper = shallow(<HomeScreen { ...props } />);

  return {
    props,
    enzymeWrapper
  };
};

describe('Home Screen', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(props);
    expect(enzymeWrapper.text()).toBe('<AppLoading />');
  });

  it('should render after font is loaded', () => {
    const { enzymeWrapper } = setup({ ...props, fontLoaded: true });
    expect(enzymeWrapper.find('View').length).toBe(1);
    expect(enzymeWrapper.find('Header').length).toBe(1);
    expect(enzymeWrapper.find('Text').length).toBe(4);
    expect(enzymeWrapper.find('TouchableOpacity').length).toBe(3);
  });

  it('should call functions when button pressed', () => {
    const navigation = { navigate: jest.fn() };
    const newProps = { ...props, navigation };
    const { enzymeWrapper } = setup({ ...newProps, fontLoaded: true });

    enzymeWrapper.find('TouchableOpacity').at(2).props().onPress();
    expect(navigation.navigate.mock.calls.length).toBe(1);
  });
});
