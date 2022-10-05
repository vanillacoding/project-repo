import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginScreen from '../LoginScreen.js';
import { TouchableOpacity } from 'react-native';

Enzyme.configure({ adapter: new Adapter() });

const mockNavi = jest.fn();
const mockFetch = jest.fn();

const props = {
  navigation: {
    navigate: mockNavi
  },
  screenProps: {
    fetchFacebookData: mockFetch
  }
};

const wrapper = shallow(<LoginScreen {...props} />);

describe('LoginScreen', () => {
  it('should trigger fetchFacebookData on TouchableOpacity press', () => {
    expect(wrapper.find(TouchableOpacity).length).toBe(1);

    wrapper.find(TouchableOpacity).simulate('press');

    expect(props.screenProps.fetchFacebookData).toHaveBeenCalled();
  });
});
