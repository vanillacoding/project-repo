import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  }),
}))

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn()
}))

describe('Login Component', () => {
  let wrapper;
  let initialProps;
  beforeEach(() => {
    initialProps = {
      responseGoogle: jest.fn()
    };
    wrapper = shallow(<Login />);
  });

  it('Should render without errors', () => {
    expect(wrapper.find('.background').length).toBe(1);
    expect(wrapper.find('.logo').length).toBe(1);
    expect(wrapper.find('.login').length).toBe(1);
    expect(wrapper.find('.p').text()).toBe('A book that is shut is but a block');
    expect(wrapper.find('.p2').text()).toBe('Thomas Fuller');
  });

  it('Should not calls responseGoogle function if user unauthorized', () => {
    wrapper.find('.login').simulate('onSuccess');
    expect(initialProps.responseGoogle).not.toHaveBeenCalled();
  });
})
