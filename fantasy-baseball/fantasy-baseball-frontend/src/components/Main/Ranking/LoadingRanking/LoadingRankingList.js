import React from "react";

import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin: 1rem 0 1rem 0;
  display: flex;
  align-items: center;
`;

const LoadingFirstRankInfo = styled.div`
  width: 90px;
  height: 115px;
  margin: 0 0 0 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: flex-end;
  line-height: 30px;
`;

function LoadingRankingList() {
  return (
    <Wrapper>
      <Skeleton
        width={90}
        height={115}
      />
      <LoadingFirstRankInfo>
        <Skeleton
          width={90}
          height={20}
          count={2}
        />
      </LoadingFirstRankInfo>
    </Wrapper>
  );
}

export default LoadingRankingList;
