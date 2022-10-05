import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
  const mockFn = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Button text='확인' onClick={mockFn} />);
  });

  it('should render button text', () => {
    expect(wrapper.props().children).toBe('확인');
  });

  it('should call onClick event', () => {
    wrapper.find('button').simulate('click');
    expect(mockFn.mock.calls.length).toEqual(1);
  });
});
