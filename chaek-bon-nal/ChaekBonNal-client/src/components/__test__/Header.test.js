import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

jest.mock('react-router-dom', () => ({
  useCallback: () => jest.fn()
}))

describe('Login Component', () => {
  const onLogin = () => {
    const token = 'some fake token';
    return localStorage.setItem('token', token);
  }
  let wrapper;
  let initialProps;

  beforeEach(() => {
    initialProps = {
      onLogoutSuccess: jest.fn(),
    };
    wrapper = shallow(
      <Header
        {...initialProps}
      />
    );
  });

  it('Should render Header component without errors', () => {
    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find('.headerWraaper')).toHaveLength(1);
  });

  it('Should render logout button if user logged in', () => {
    wrapper.find('.login').simulate('click');
    onLogin();
    expect(wrapper.find('.logoutButton')).toHaveLength(1);
  });

  // it('Should calls onLogoutSuccess function if user click logout button', () => {
  //   wrapper.find('.logoutButton').simulate('click');
  //   expect(initialProps.onLogoutSuccess).toHaveBeenCalled();
  // });
})