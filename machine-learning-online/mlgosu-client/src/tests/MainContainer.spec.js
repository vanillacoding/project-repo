import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MainContainer from '../container/MainContainer';

describe('<MainContainer />', () => {
  it("should render correctly", () => {
    const wrapper = shallow(<MainContainer />);
    expect(wrapper.length).toBe(1);
  });

  it('counter increments the count', () => {
    const wrapper = shallow(<MainContainer />);

  })
});
