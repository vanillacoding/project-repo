import 'react-native';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatMarkers from '../components/ChatMarkers';

configure({ adapter: new Adapter() });

const mockData = {
  chatTitle: 'title',
  navigation: {
    navigate: jest.fn()
  }
};

describe('<ChatMarkers />', () => {
  it('should render chat title', () => {
    const wrapper = shallow(<ChatMarkers chatTitle={mockData.chatTitle} />);
    const titleText = wrapper.find('Text').first().render().text();

    expect(titleText).toBe(mockData.chatTitle);
  });

  it('should be called mock function when chat marker is clicked', () => {
    const wrapper = shallow(<ChatMarkers navigation={mockData.navigation} />);
    const marker = wrapper.find('Text').parent();

    marker.first().simulate('press');

    expect(mockData.navigation.navigate.mock.calls.length).toBe(1);
  });
});
