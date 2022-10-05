import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemPage from './pages/ProblemPage';
import SolutionsPage from './pages/SolutionsPage';

const App = () => (
  <Switch>
    <Route component={HomePage} path="/" exact />
    <Route component={ProfilePage} path="/profile" />
    <Route component={LoginPage} path="/users/login" />
    <Route component={SignupPage} path="/users/signup" />
    <Route component={ProblemsPage} path="/problems" exact />
    <Route component={ProblemPage} path="/problems/:problem_id" exact />
    <Route component={SolutionsPage} path="/problems/:problem_id/solutions" />
    <Redirect to="/" />
  </Switch>
);

export default App;
