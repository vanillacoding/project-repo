import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const actions = {
  onSetUser: jest.fn()
};
const wrapper = shallow(<Login {...actions} />);

describe('<Login />', () => {
  it('The Facebook login button should be rendered', () => {
    expect(wrapper.find(FacebookLogin)).toHaveLength(1);
  });

  it('The Google login button should be rendered', () => {
    expect(wrapper.find(GoogleLogin)).toHaveLength(1);
  });
});
