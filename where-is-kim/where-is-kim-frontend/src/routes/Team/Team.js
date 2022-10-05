import React from "react";
import styled from "styled-components";
import TeamAside from "../../components/TeamAside/Container";
import TeamHeader from "../../components/TeamHeader/TeamHeader";
import { Switch, Route } from "react-router-dom";
import Threads from "../Threads/Container";
import Record from "../Record/Container";
import Admin from "../Admin/Container";

export default function Team({
  name,
  currentPage,
  displayName,
  thumbnail,
  isAdmin,
}) {
  return (
    <Wrapper>
      <TeamAside teamPic={thumbnail} teamName={displayName} />
      <TeamHeader teamName={name} currentPage={currentPage} isAdmin={isAdmin} />
      <Main>
        <Switch>
          <Route exact path="/team/:name" component={Threads} />
          <Route path="/team/:name/record" component={Record} />
          <Route path="/team/:name/admin" component={Admin} />
        </Switch>
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;
  & aside {
    grid-row: 1/3;
  }
`;
const Main = styled.main`
  overflow-y: scroll;
  padding-bottom: 30px;
`;
