import 'react-native';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomeScreen from '../screens/HomeScreen';
import Loading from '../components/Loading';

configure({ adapter: new Adapter() });

describe('<HomeScreen />', () => {
  const wrapper = shallow(<HomeScreen />);

  it('should render loding component', () => {
    expect(wrapper.contains(<Loading />)).toBe(true);
  });
});
