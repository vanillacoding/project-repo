import React, { useState, useEffect, useContext } from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import styles from "./styles/App.module.css";

import "./styles/reset.css";
import "./styles/font.css";

import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";

import {
  ReducerContext,
  actionCreators,
  selectors,
} from "../features/rootSlice";

import UserSignIn from "./UserSignIn";
import AdminAuth from "./AdminAuth";
import AdminSignIn from "./AdminSignIn";
import AdminSignUp from "./AdminSignUp";
import Main from "./Main";
import Modal from "./Modal";
import DogProfile from "./DogProfile";
import Posts from "./Posts";
import DogsInformation from "./DogsInformation";
import DogForm from "./DogForm";
import PostForm from "./PostForm";
import Menu from "./Menu";
import Loading from "./shared/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(ReducerContext);
  const location = useLocation();
  const { adminAuthPassed, userAdded } = actionCreators;
  const { getUserId, getIsPassedAdminAuth } = selectors;
  const modal = location.state?.modal;

  const hasUserSignedIn = !!getUserId(state);
  const isPassedAdminAuth = getIsPassedAdminAuth(state);

  useEffect(() => {
    if (hasUserSignedIn || !isLoading) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/user`,
          { credentials: "include" },
          signal,
        );
        const { message, result } = await response.json();

        if (message === "ok") {
          const userSession = {
            id: result._id,
            name: result.user_name,
            isAdministrator: result.is_administrator,
            character: result.character,
            accessTime: result.access_time,
          };

          if (userSession.isAdministrator) {
            dispatch(
              adminAuthPassed(),
            );
          }

          dispatch(
            userAdded(userSession),
          );
        }
      } catch (error) {
        logWarnOrErrInDevelopment(error);
      } finally {
        setTimeout(() =>setIsLoading(false), 500);
      }

    };

    fetchUser();

    return () => controller.abort();
  }, [hasUserSignedIn, isLoading, dispatch, userAdded, adminAuthPassed]);

  if (isLoading) {
    return <Loading className={styles.loading}/>;
  }

  return (
    <>
      <Switch location={modal || location}>
        <Route exact path="/admin">
          {isPassedAdminAuth
            ? <Redirect to="/" />
            : <AdminAuth />
          }
        </Route>
        <Route exact path="/admin/sign-in">
          {isPassedAdminAuth
            ? <AdminSignIn />
            : <Redirect to="/admin" />
          }
        </Route>
        <Route exact path="/admin/sign-up">
          {isPassedAdminAuth
            ? <AdminSignUp />
            : <Redirect to="/admin" />
          }
        </Route>
        <Route path="/sign-in">
          {hasUserSignedIn
            ? <Redirect to="/" />
            : <UserSignIn />
          }
        </Route>
        <Route exact path="/">
          {hasUserSignedIn
            ? <Main />
            : <Redirect to="/sign-in" />
          }
        </Route>
        <Redirect to="/" />
      </Switch>
      {modal
        ? <Modal>
            <Switch>
              <Route exact path="/posts">
                <Posts />
              </Route>
              <Route path="/posts/edit/:id">
                <PostForm />
              </Route>
              <Route path="/posts/new">
                <PostForm />
              </Route>
              <Route exact path="/dogs">
                <DogsInformation />
              </Route>
              <Route path="/dogs/new">
                <DogForm />
              </Route>
              <Route path="/dogs/edit/:id">
                <DogForm />
              </Route>
              <Route path="/dogs/:id">
                <DogProfile />
              </Route>
              <Route path="/menu">
                <Menu />
              </Route>
            </Switch>
          </Modal>
        : null
      }
    </>
  );
}

export default App;
