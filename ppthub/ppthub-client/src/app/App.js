import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";

import SEQUENCES from "../config/constants/sequences";
import GlobalStyle from "./GlobalStyle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import NotFoundPage from "../components/NotFoundPage";
import ErrorPage from "../components/ErrorPage";
import RightSelectionBar from "../components/RightSelectionBar";
import Download from "../components/Download";

function App() {
  const sequence = useSelector((state) => state.sequence);

  return (
    <AppContainer>
      <GlobalStyle />
      <MainSection>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id/download" element={<Download />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </MainSection>
      {sequence === SEQUENCES.COMPARISION && <RightSelectionBar />}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const MainSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default App;
