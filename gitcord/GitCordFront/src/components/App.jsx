import { Redirect, Route, Switch } from "react-router-dom";

import route from "../constants/routes";
import { PAGE_NOT_FOUND } from "../constants/message";

import ChannelList from "./ChannelList/ChannelList";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Main from "./Main/Main";
import Error from "./Error/Error";

function App() {
  return (
    <Switch>
      <Route exact path={route.HOME} component={ChannelList} />
      <Route path={route.LOGIN} component={Login} />
      <Route path={route.SIGNUP} component={SignUp} />
      <Route path={`${route.MAIN}/:roomId`} component={Main} />
      <Route path={route.ERROR} component={Error} />
      <Redirect
        from="/*"
        to={{
          pathname: route.ERROR,
          state: { message: PAGE_NOT_FOUND }
        }}
      />
    </Switch>
  );
}

export default App;
