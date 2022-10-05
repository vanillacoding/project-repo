import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';

describe('renders correctly', () => {
  const mockFn = jest.fn();
  const children = 'button';
  const color = '#9CE6C5';

  const wrapper = mount(
    <Button onClick={mockFn} color={color}>{children}</Button>,
  );

  it('renders children content', () => {
    expect(wrapper.text()).toEqual('button');
  });

  it('function should be called', () => {
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('should paint color', () => {
    expect(wrapper.prop('color')).toEqual(color);
  });
});
