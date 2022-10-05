import React from "react";

import { SkeletonTheme } from "react-loading-skeleton";
import styled, { useTheme } from "styled-components";

import LoadingTable from "../../Shared/Loading/LoadingTable";

const Wrapper = styled.div`
  width: calc(100vw - 332px);
  height: 100%;
  display: flex;
  justify-content: center;
  line-height: 30px;
`;

const LoadingHistoryWrapper = styled.div`
  width: calc(100vw - 348px);
  padding: ${({ theme }) => theme.padding.base};
  display: flex;
  flex-flow: column;
`;

function LoadingHistory() {
  const theme = useTheme();

  return (
    <Wrapper>
      <SkeletonTheme
        color={theme.skeletonColor.skeleton}
        highlightColor={theme.skeletonColor.highlight}
      >
        <LoadingHistoryWrapper>
          <LoadingTable />
        </LoadingHistoryWrapper>
      </SkeletonTheme>
    </Wrapper>
  );
}

export default LoadingHistory;
