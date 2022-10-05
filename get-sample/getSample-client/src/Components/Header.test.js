import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header Component', () => {
  it('renders without crushing when isLoggedIn is false', () => {
    const props = {
      isLoggedIn: false,
    };
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.contains(<Link to="/#">HOME</Link>)).toBe(true);
    expect(
      wrapper.contains(
        <Link to="/login" className="login-button">
          LOGIN
        </Link>,
      ),
    ).toBe(true);
  });

  it('renders without crushing when isLoggedIn is true', () => {
    const props = {
      isLoggedIn: true,
      userInfo: { profile_image_url: 'URL' },
    };
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.contains(<Link to="/#">HOME</Link>)).toBe(true);
    expect(
      wrapper.contains(<Link to="/myWords">MY WORDS</Link>),
    ).toBe(true);
    expect(
      wrapper.contains(
        <img className="user-profile-image" src="URL" alt="user" />,
      ),
    ).toBe(true);
  });
});
