import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50px;
  line-height: 0;
  text-align: center;
`;

function LoadingSlot() {
  return (
    <Wrapper>
      <SkeletonTheme
        color="#a0a0a0"
        highlightColor="#6f6f6f"
      >
        <Skeleton
          width={30}
          height={30}
          circle={true}
        />
        <Skeleton
          width={50}
          height={40}
        />
      </SkeletonTheme>
    </Wrapper>
  );
}

export default LoadingSlot;
