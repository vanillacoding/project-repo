import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import MyTranslations from "./MyTranslations";
import EditGlossary from "./EditGlossary";
import DetailOtherGlossary from "./DetailOtherGlossary";
import Layout from "./shared/layouts";
import OtherGlossaries from "./OtherGlossaries";
import TabContainer from "./shared/TabContainer";

import {
  MY_GLOSSARY,
  MY_TRANSLATIONS,
  OTHER_GLOSSARIES,
  OTHER_GLOSSARY,
} from "../constants/url";
import { updateUser } from "../features/user/userSlice";
import chromeStore from "../utils/chromeStore";

function Options() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    chrome.storage.onChanged.addListener(({ userData }) => {
      if (userData) {
        dispatch(updateUser(userData.newValue));
      }
    });

    (async () => {
      const userData = await chromeStore.get("userData");

      if (userData) {
        dispatch(updateUser(userData));
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <TabContainer>로딩 중...</TabContainer>;
  }

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={MY_GLOSSARY}>
            <EditGlossary />
          </Route>
          <Route exact path={MY_TRANSLATIONS}>
            <MyTranslations />
          </Route>
          <Route exact path={OTHER_GLOSSARIES}>
            <OtherGlossaries />
          </Route>
          <Route exact path={OTHER_GLOSSARY}>
            <DetailOtherGlossary />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default Options;
