import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../ErrorPage";
import Home from "../Home";
import Login from "../Login";
import Search from "../Search";
import SideNav from "../SideNav";
import StreamingPage from "../StreamingPage";
import TopNav from "../TopNav";
import UserDetail from "../UserDetail";
import useAuthCheck from "../../hooks/useAuthCheck";
import "../../styles/index";

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  useAuthCheck();

  return (
    !isAuthenticated ? (
      <Route path="/auth/login" component={Login} />
    ) : (
      <>
        <TopNav />
        <SideNav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/streaming/:id" component={StreamingPage} />
          <Route path="/user/:id" component={UserDetail} />
          <Route path="/search" component={Search} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </>
    )
  );
}

export default App;
