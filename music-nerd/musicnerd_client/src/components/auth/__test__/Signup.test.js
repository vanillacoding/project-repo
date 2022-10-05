import React from 'react';
import { mount } from 'enzyme';
import Signup from '../Signup';

describe('<Signup /> component', () => {
  const mockFn = jest.fn();

  it('should render with 4 form inputs and sumbit button.', () => {
    const wrapper = mount(<Signup loading={false} requestSignup={mockFn} />);
    const form = wrapper.find('form');

    expect(form).toHaveLength(1);
    expect(form.find('input')).toHaveLength(5);
    expect(form.find('input').at(0).props().placeholder).toEqual('Username (max 8 characters)');
    expect(form.find('input').at(1).props().placeholder).toEqual('example@example.com');
    expect(form.find('input').at(2).props().placeholder).toEqual('Password (over 6 characters)');
    expect(form.find('input').at(3).props().placeholder).toEqual('Confirm password');
    expect(form.find('input').at(4).props().value).toEqual('Register');
  });
});
