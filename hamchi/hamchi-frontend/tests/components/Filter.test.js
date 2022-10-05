import React from 'react';
import { Provider } from 'react-redux';
import store from '../../features/store';
import renderer from 'react-test-renderer';
import Filter from '../../components/Filter';

describe('filter test', () => {
  it('renders correctly', () => {
    const mockTitle = 'mock title';
    const tree = renderer.create(
      <Provider store={store}>
        <Filter title={mockTitle} />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
