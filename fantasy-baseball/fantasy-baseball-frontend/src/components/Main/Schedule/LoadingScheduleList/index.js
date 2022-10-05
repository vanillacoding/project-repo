import React from "react";

import { SkeletonTheme } from "react-loading-skeleton";
import styled, { useTheme } from "styled-components";

import LoadingScheduleList from "./LoadingScheduleList";

const Wrapper = styled.div`
  width: calc(100% - 350px);
  min-width: 1200px;
  position: relative;
`;

function LoadingSchedule() {
  const theme = useTheme();

  return (
    <Wrapper>
      <SkeletonTheme
        color={theme.skeletonColor.skeleton}
        highlightColor={theme.skeletonColor.highlight}
      >
        <h2 className="english-title">TODAY GAMES</h2>
        <LoadingScheduleList />
      </SkeletonTheme>
    </Wrapper>
  );
}

export default LoadingSchedule;
