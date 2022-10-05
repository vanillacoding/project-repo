import React from 'react';
import { shallow } from 'enzyme';

import { EditScreen } from '../../src/components/screens/EditScreen';
import * as api from '../../src/utils/api';

jest.useFakeTimers();

const savePortraitSpy = jest.spyOn(api, 'savePortrait');

const props = {
  loggedIn: { user: { _id: '123' } },
  faceType: {},
  option: 0,
  optionTheme: {
    id: 1,
    options: [[1, 2], [3, 4]]
  },
  setFaceType: jest.fn(),
  setCurrentOption: jest.fn(),
  setOptionTheme: jest.fn(),
  route: { params: { portrait: { faceType: {} }, mode: 'Edit' } },
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn()
  }
};

const setup = (props) => {
  const enzymeWrapper = shallow(<EditScreen {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe('Edit Screen with Edit mode', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(props);

    expect(enzymeWrapper.find('View').length).toBe(3);
    expect(enzymeWrapper.find('Text').length).toBe(3);
    expect(enzymeWrapper.find('Canvas').length).toBe(1);
    expect(enzymeWrapper.find('TouchableOpacity').length).toBe(4);
  });

  it('should call function when first/second button pressed', () => {
    const setFaceType = jest.fn();
    const setCurrentOption = jest.fn();
    const { enzymeWrapper } = setup({ ...props, setFaceType, setCurrentOption });

    enzymeWrapper.find('TouchableOpacity').at(0).props().onPress();
    expect(setFaceType.mock.calls.length).toBe(1);
    expect(setCurrentOption.mock.calls.length).toBe(1);

    enzymeWrapper.find('TouchableOpacity').at(1).props().onPress();
    expect(setFaceType.mock.calls.length).toBe(2);
    expect(setCurrentOption.mock.calls.length).toBe(2);
  });

  it('should call function when third button pressed', () => {
    const enzymeWrapper = shallow(<EditScreen {...props} savePortrait={savePortraitSpy} />);

    enzymeWrapper.find('TouchableOpacity').at(2).props().onPress();
    expect(savePortraitSpy.mock.calls.length).toBe(1);
  });

  it('should call function when third button pressed', () => {
    const navigation = { goBack: jest.fn() };
    const { enzymeWrapper } = setup({ ...props, navigation });

    enzymeWrapper.find('TouchableOpacity').at(3).props().onPress();
    expect(navigation.goBack.mock.calls.length).toBe(1);
  });
});

describe('Edit Screen with result mode', () => {
  it('should call function when third button pressed', () => {
    const navigation = { goBack: jest.fn(), navigate: jest.fn() };
    const newProps = { 
      ...props,
      route: { params: { portrait: { faceType: {} }, mode: 'Result' } },
      navigation
    };
    const { enzymeWrapper } = setup(newProps);

    enzymeWrapper.find('TouchableOpacity').at(3).props().onPress();
    expect(navigation.navigate.mock.calls.length).toBe(1);
  });

  it('should render correct message with mode result', () => {
    const newProps = { 
      ...props,
      route: { params: { portrait: { faceType: {} }, mode: 'Result' } },
    };
    const { enzymeWrapper } = setup(newProps);

    expect(enzymeWrapper.find('Text').at(2).prop('children')).toBe('다시하기');
  });
});
