import React from "react";
import { Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserView, MobileView } from "react-device-detect";

import { Music } from "../components/Music/Music";
import { Home } from "../pages/Home/Home";
import { Tutorial } from "../pages/Tutorial/Tutorial";
import { Game } from "../pages/Game/Game";
import { GameList } from "../pages/GameList/GameList";
import { Error } from "../pages/Error/Error";
import { NotFound } from "../pages/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserView>
        <Music />
        <Global />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/tutorial/:tutorialId" element={<Tutorial />} />
          <Route path="/game_list" element={<GameList />} />
          <Route path="/game/:gameId" element={<Game />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Message>
          <CatIcon>😿</CatIcon>
          이 사이트는 PC에서만 접근 가능합니다.
          <br />
          <br />
          PC로 접속해주세요.
        </Message>
      </MobileView>
    </>
  );
}

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
`;

const Message = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 1.2rem;
  width: 100vw;
  height: 100vh;
`;

const CatIcon = styled.p`
  margin: 1rem;
  font-size: 4rem;
`;

export { App };
