import 'react-native';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MapScreen from '../screens/MapScreen';

configure({ adapter: new Adapter() });

describe('<MapScreen />', () => {
  it('should render current location', () => {
    const wrapper = shallow(<MapScreen />);

    expect(wrapper.contains('현재위치')).toBe(true);
  });

  it('should render button', () => {
    const wrapper = shallow(<MapScreen />);

    expect(wrapper.contains('채팅방 만들기')).toBe(true);
  });

  it('should called mock function when create chat button click', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<MapScreen showModal={mockFunc} />);
    const button = wrapper.find('TouchableOpacity');

    button.first().simulate('press');

    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
