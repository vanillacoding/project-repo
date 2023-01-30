import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeLayOut from "../layout/HomeLayOut";
import HomePage from "../pages/HomePage";
import GuidePage from "../pages/GuidePage";
import ConsoleLayOut from "../layout/ConsoleLayOut";
import ProjectsPage from "../pages/ProjectsPage";
import ChannelsPage from "../pages/ChannelsPage";
import ErrorPage from "../pages/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayOut />}>
        <Route index element={<HomePage />} />
        <Route path="guide" element={<GuidePage />} />
      </Route>
      <Route path="console" element={<ConsoleLayOut />}>
        <Route path="projects">
          <Route index element={<ProjectsPage />} />
          <Route path=":projectId">
            <Route index element={<ProjectsPage />} />
            <Route path="channels" element={<ChannelsPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
