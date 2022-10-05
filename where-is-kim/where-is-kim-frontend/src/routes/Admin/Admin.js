import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Dashboard from "../Dashboard/Container";
import Analytics from "../Analytics/Container";
import Participants from "../Participants/Container";
import styled from "styled-components";

const Verified = () => {
  return (
    <Switch>
      <Route exact path="/team/:name/admin/" component={Dashboard} />
      <Route path="/team/:name/admin/analytics" component={Analytics} />
      <Route path="/team/:name/admin/participants" component={Participants} />
    </Switch>
  );
};

const Unverified = () => {
  return (
    <Inner>
      <p>
        접근이 불가능한 페이지 입니다. <br />
        허튼 짓하지 마세요.
      </p>
      <p>
        <Button to="/">홈으로</Button>
      </p>
    </Inner>
  );
};

export default function Admin({ isAdmin }) {
  return <Wrapper>{isAdmin ? <Verified /> : <Unverified />}</Wrapper>;
}

const Wrapper = styled.div`
  min-height: 100%;
  padding: 30px 30px 0;
`;
const Button = styled(Link)`
  display: inline-block;
  padding: 0 15px;
  background-color: #666;
  border: 0;
  vertical-align: top;
  line-height: 35px;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  text-transform: uppercase;
`;
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 150px;
  & p {
    margin-bottom: 21px;
  }
`;
