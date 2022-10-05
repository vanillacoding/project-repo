import React from 'react';
import { shallow } from 'enzyme';
import AppContainer from '../container/AppContainer';

describe('<AppContainer />', () => {
  test("should render MainContainer", () => {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper.find("MainContainer")).toHaveLength(1);
  });
});
