import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Template from '../Template.js';
import { Text, Image, TouchableOpacity } from 'react-native';

Enzyme.configure({ adapter: new Adapter() });

const mockNav = jest.fn();
const props = {
  nav: {
    navigate: mockNav
  },
  path: 'test',
  template: {
    name: 'test',
    url: 'http://'
  }
};

const wrapper = shallow(<Template {...props} />);

describe('Template', () => {
  it('should trigger navigation prop on TouchableOpacity press', () => {
    expect(wrapper.find(TouchableOpacity).length).toBe(1);

    wrapper.find(TouchableOpacity).simulate('press');

    expect(props.nav.navigate).toHaveBeenCalled();
  });

  it('should render Image of source uri from template prop', () => {
    expect(wrapper.find(Image).length).toBe(1);

    expect(
      wrapper.find(Image).prop('source').uri
    ).toBe(props.template.url)
  });

  it('should render template name in Text component', () => {
    expect(wrapper.find(Text).length).toBe(1);

    expect(
      wrapper.contains(<Text>{props.template.name}</Text>)
    ).toBe(true);
  });
});
