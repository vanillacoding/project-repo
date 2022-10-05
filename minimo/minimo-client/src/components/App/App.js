import React, { useContext } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../Navbar';
import Login from '../Login';
import { ProjectProvider } from '../../contexts/ProjectContext';
import ProjectByAddress from '../ProjectByAddress';
import { AuthContext } from '../../contexts/AuthContext';
import Main from '../Main';
import ProjectFormStepper from '../ProjectFormStepper';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Navbar />
            <Main />
          </Route>
          {user && (
            <Route exact path='/editor'>
              <Navbar isEditor />
              <ProjectProvider>
                <ProjectFormStepper />
              </ProjectProvider>
            </Route>
          )}
          {!user && <Route exact path='/login' component={Login} />}
          <Route exact path='/:address' component={ProjectByAddress} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export default App;
