import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Navigator from './src/navigators/index';
import store from './src/store';

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}
