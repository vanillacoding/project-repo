import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderMenu from '../HeaderMenu.js';
import { TouchableOpacity } from 'react-native';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  nav: {
    navigate: jest.fn(),
    openDrawer: jest.fn()
  },
  name: 'test',
  dir: false
};

const propWithDir = {
  nav: {
    navigate: jest.fn(),
    openDrawer: jest.fn()
  },
  name: 'test2',
  dir: true,
  screen: 'test screen'
};

const wrapper = shallow(<HeaderMenu {...props} />);
const wrapperWithDir = shallow(<HeaderMenu {...propWithDir} />);

describe('HeaderMenu', () => {
  it('should render TouchableOpacity component', () => {
    expect(wrapper.find(TouchableOpacity).length).toBe(1);
  });

  it('should trigger nav prop dynamically depends on dir prop', () => {
    wrapper.find(TouchableOpacity).simulate('press');

    expect(props.nav.navigate).not.toHaveBeenCalled();
    expect(props.nav.openDrawer).toHaveBeenCalled();

    wrapperWithDir.find(TouchableOpacity).simulate('press');

    expect(propWithDir.nav.navigate).toHaveBeenCalled();
    expect(propWithDir.nav.openDrawer).not.toHaveBeenCalled();
  });
});
