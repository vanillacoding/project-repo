import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from './helpers/withAuth';
import Header from './partials/Header';
import Container from '../containers/Container';
import ProjectDetail from '../containers/ProjectDetail';
import Loading from './partials/Loading';
import Error from './partials/Error';
import './css/style.scss';

const App = (props) => {
  const {
    jwtoken,
    onProjectListLoad,
    isLoading,
    isError
  } = props;

  useEffect(() => {
    if (jwtoken) {
      onProjectListLoad(jwtoken);
    }
  }, [ onProjectListLoad, jwtoken ]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="app-container">
      <Header {...props} />
      <Switch>
        <Route
          exact path="/"
          render={routerProps => (
            <Container.ProjectList
              {...routerProps}
            />
          )}
        />
        <Route
          exact path="/project/:token"
          render={routerProps => (
            <ProjectDetail {...routerProps} />
          )}
        />
        <Route
          path="/"
          render={() => (
            <Error
              status="404"
              message="Page Not Found"
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default withAuth(App);
