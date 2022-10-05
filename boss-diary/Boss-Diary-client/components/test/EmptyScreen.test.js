import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EmptyScreen from '../EmptyScreen.js';
import { View, Text, Icon } from 'native-base';

Enzyme.configure({ adapter: new Adapter() });


const wrapper = shallow(<EmptyScreen message={'test'} />);

describe('EmptyScreen', () => {
  it('should render View component', () => {
    expect(wrapper.find(View).length).toBe(1);
  });

  it('should render Icon component', () => {
    expect(wrapper.find(Icon).length).toBe(1);

    expect(
      wrapper.find(Icon).prop('name')
    ).toBe('ios-information-circle-outline');
  });

  it('should render message prop in Text component', () => {
    expect(wrapper.find(Text).length).toBe(1);

    expect(
      wrapper.contains(<Text>{'test'}</Text>)
    ).toBe(true);
  });
});
