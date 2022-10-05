import React from 'react';
import { mount } from 'enzyme';
import LandingPage from '../components/LandingPage';
import { render, fireEvent, getByTestId} from '@testing-library/react';

describe('<LandingPage />', () => {
  it("should get input data correctly", () => {
    const driveUrl = 'http://localhost:8000';
    const wrapper = mount(<LandingPage driveUrl={ driveUrl } />);
    wrapper.find('Input').instance().value =
        'This is not google_drive_url, but text for test';
    expect(wrapper.find('Input').instance().value).toEqual(
        'This is not google_drive_url, but text for test'
    );
  });
});
