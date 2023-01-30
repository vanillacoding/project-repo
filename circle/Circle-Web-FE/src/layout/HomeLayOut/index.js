import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./Navbar";

export default function HomeLayOut() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
