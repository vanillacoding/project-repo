import React from 'react';
import { shallow } from 'enzyme';

import { ReadyScreen } from '../../src/components/screens/ReadyScreen';
import * as api from '../../src/utils/api';
import * as util from '../../src/utils/index';

jest.useFakeTimers();

const fetchImageSpy = jest.spyOn(api, 'fetchImage');
const openCameraSpy = jest.spyOn(util, 'openCamera');
const pickImageSpy = jest.spyOn(util, 'pickImage');

const props = {
  loggedIn: { user: { _id: '123' } },
  photoUrl: 'url',
  setPhoto: jest.fn(),
  setFaceType: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

const setup = (props) => {
  const enzymeWrapper = shallow(<ReadyScreen {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe('Ready Screen', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(props);

    expect(enzymeWrapper.find('View').length).toBe(2);
    expect(enzymeWrapper.find('Text').length).toBe(3);
    expect(enzymeWrapper.find('Image').length).toBe(1);
    expect(enzymeWrapper.find('TouchableOpacity').length).toBe(3);
  });

  it('should call function when first button pressed', () => {
    const enzymeWrapper = shallow(<ReadyScreen {...props} fetchImage={fetchImageSpy} />);

    enzymeWrapper.find('TouchableOpacity').at(0).props().onPress();
    expect(fetchImageSpy.mock.calls.length).toBe(1);
  });

  it('should call function when second button pressed', () => {
    const enzymeWrapper = shallow(<ReadyScreen {...props} openCamera={openCameraSpy} />);

    enzymeWrapper.find('TouchableOpacity').at(1).props().onPress();
    expect(openCameraSpy.mock.calls.length).toBe(1);
  });

  it('should call function when third button pressed', () => {
    const enzymeWrapper = shallow(<ReadyScreen {...props} pickImage={pickImageSpy} />);

    enzymeWrapper.find('TouchableOpacity').at(2).props().onPress();
    expect(pickImageSpy.mock.calls.length).toBe(1);
  });
});
