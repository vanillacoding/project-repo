import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Login from '../Login';

Enzyme.configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let wrapper;
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
    wrapper = shallow(
      <Login
        handleLogin={mockFn}
      />
    );
  });

  it('renders login page', () => {
    expect(wrapper.find('.login-container')).toHaveLength(1);
    expect(wrapper.find('.login-box')).toHaveLength(1);
  });

  it('calls handleLogin function if user clicks login button', () => {
    let btn = wrapper.find('.btn-basic');
    expect(btn.text()).toEqual('Login with Github');

    btn.simulate('click');
    btn.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
