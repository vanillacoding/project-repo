import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BottomButton from '../BottomButton.js';
import { Button } from 'react-native';

Enzyme.configure({ adapter: new Adapter() });

const mockPress = jest.fn();
const props = {
  title: 'hello',
  onPress: mockPress
};

const wrapper = shallow(<BottomButton {...props} />);

describe('BottomButton', () => {
  it('should render Button with title prop', () => {
    expect(wrapper.find(Button).prop('title')).toBe(props.title);
  });

  it('should trigger onPress prop on Button press', () => {
    expect(wrapper.find(Button).length).toBe(1);

    wrapper.find(Button).simulate('press');

    expect(props.onPress).toHaveBeenCalled();
  });
});
