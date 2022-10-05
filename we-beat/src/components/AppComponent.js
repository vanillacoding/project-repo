import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import MainContainer from '../containers/MainContainer';

class App extends Component {

  render() {
    return (
      <Fragment>
        <Route path="/" exact render={(props) => <MainContainer />} />
        <Route path="/:id" exact render={(props) => <MainContainer {...props} />} />
      </Fragment>
    );
  }
}

export default App;
