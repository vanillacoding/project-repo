import React from 'react';
import { mount, shallow } from 'enzyme';
import Canvas from './Canvas';

describe('renders correctly', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Canvas />);

    expect(wrapper.find('canvas'));
  });
});
