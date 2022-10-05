import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { GET_STARTED } from "./constants/url";

import Layout from "./layouts";
import GetStartedPage from "./pages/GetStartedPage";
import IndexPage from "./pages/IndexPage";

function App() {
  return (
    <Router>
      <Layout className="App">
        <Switch>
          <Route path={GET_STARTED}>
            <GetStartedPage />
          </Route>

          <Route path="/">
            <IndexPage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
