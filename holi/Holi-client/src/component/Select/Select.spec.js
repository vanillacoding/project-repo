import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';

const actions = {
  onSelect: jest.fn(),
  list: ['상시', '1', '2', '3', '4', '5'],
};
const wrapper = shallow(<Select {...actions} />);

describe('<Select />', () => {
  it('Option should be rendered for length of the list', () => {
    expect(wrapper.find('option').length).toEqual(actions.list.length);
  });

  it('OnSelect function should be executed each time the option is selected', () => {
    wrapper.find('select').simulate('change', { target: { value: '1' } });
    expect(actions.onSelect).toBeCalled();
  });
});
