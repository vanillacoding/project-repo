import React from 'react';
import { mount } from 'enzyme';
import Login from '../Login';

describe('<Login /> component', () => {
  const mockFn = jest.fn();
  it('should render with 2 form inputs and submit button.', () => {
    const wrapper = mount(<Login loading={false} requestLogin={mockFn} />);
    const form = wrapper.find('form');

    expect(form.length).toBe(1);
    expect(form.find('input')).toHaveLength(3);
    expect(form.find('input').at(0).props().placeholder).toEqual('example@example.com');
    expect(form.find('input').at(1).props().placeholder).toEqual('Password (over 6 characters)');
    expect(form.find('input').at(2).props().value).toEqual('Login');
  });
});
