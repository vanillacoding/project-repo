import React from "react";

import { SkeletonTheme } from "react-loading-skeleton";
import styled, { useTheme } from "styled-components";

import LoadingBettingOption from "../../Shared/Loading/LoadingBettingOption";
import LoadingTable from "../../Shared/Loading/LoadingTable";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  padding: ${({ theme }) => theme.padding.base};
`;

const LoadingRankingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 118px);
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

function LoadingRanking() {
  const theme = useTheme();

  return (
    <Wrapper>
      <SkeletonTheme
        color={theme.skeletonColor.skeleton}
        highlightColor={theme.skeletonColor.highlight}
      >
        <LoadingRankingWrapper>
          <LoadingTable />
          <LoadingBettingOption />
        </LoadingRankingWrapper>
      </SkeletonTheme>
    </Wrapper>
  );
}

export default LoadingRanking;
