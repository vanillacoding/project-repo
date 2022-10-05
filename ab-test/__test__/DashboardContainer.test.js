/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import DashboardContainer from '../src/client/containers/DashboardContainer';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();

describe('<DashboardContainer />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      visits: {
        isLoading: false,
      },
      test: true,
    };

    store = mockStore(initialState);

    wrapper = shallow(
      <DashboardContainer store={store} />
    );
  });

  it('it should be rendered successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
