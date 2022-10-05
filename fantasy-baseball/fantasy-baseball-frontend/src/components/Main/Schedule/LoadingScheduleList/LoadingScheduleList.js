import React from "react";

import styled from "styled-components";

import LoadingScheduleListEntry from "./LoadingScheduleListEntry";

const Wrapper = styled.div`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.skeletonColor.background};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  line-height: 25px;
`;

function LoadingScheduleList() {
  return (
    <Wrapper>
      <LoadingScheduleListEntry />
      <LoadingScheduleListEntry />
      <LoadingScheduleListEntry />
      <LoadingScheduleListEntry />
      <LoadingScheduleListEntry />
    </Wrapper>
  );
}

export default LoadingScheduleList;
