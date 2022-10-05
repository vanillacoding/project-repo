import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Home from '../pages/Home';
import CreateCampaign from '../pages/CreateCampaign';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashBoard from '../pages/Dashboard';
import PrivateRoute from '../helpers/PrivateRoute';
import Modal from '../components/Modal';
import ModalContent from '../components/ModalContent';
import DownloadHome from '../pages/DownloadHome';
import { errorSettled } from '../reducers/error';

export default function App() {
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleModalCloseButtonClick() {
    if (error.link !== '') {
      history.push(error.link);
    }

    if (error.link === 'reload') {
      history.push('/dashboard');
      window.location.reload();
    }

    dispatch(errorSettled());
  }

  return (
    <>
      <Switch>
        <Route path="/main">
          <Home />
        </Route>
        <Route exact path="/">
          <DownloadHome />
        </Route>
        <PrivateRoute path="/campaign/new">
          <CreateCampaign />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute path="/dashboard">
          <DashBoard />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      {
        error.display && (
          <Modal>
            <ModalContent
              errorType={error.message}
              onCloseButtonClick={handleModalCloseButtonClick}
            />
          </Modal>
        )
      }
    </>
  );
}
