import React from "react";
import loadable from "@loadable/component";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "../components/Shared/PrivateRoute";

const Chat = loadable(() => import("./Chat"));
const Main = loadable(() => import("./Main"));
const Login = loadable(() => import("./Login"));
const Queue = loadable(() => import("./Queue"));
const Register = loadable(() => import("./Register"));
const Settings = loadable(() => import("./Settings"));
const NotFound = loadable(() => import("./NotFound"));

const Pages = () => {
  const user = useSelector((state) => state.user);

  return (
    <Switch>
      <PrivateRoute
        path="/"
        exact
        isAuthenticated={user}
        component={Main}
      />
      <PrivateRoute
        path="/chat"
        isAuthenticated={user}
        component={Chat}
      />
      <PrivateRoute
        path="/register"
        isAuthenticated={user}
        component={Register}
      />
      <PrivateRoute
        path="/queue"
        isAuthenticated={user}
        component={Queue}
      />
      <PrivateRoute
        path="/settings"
        isAuthenticated={user}
        component={Settings}
      />
      <Route path="/login" component={Login} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
};

export default Pages;
