import React from "react";

import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Wrapper = styled.div`
  line-height: 30px;
`;

function LoadingOthers() {
  return (
    <Wrapper>
      <Skeleton
        width={400}
        height={20}
      />
      <Skeleton
        width={400}
        height={20}
      />
      <Skeleton
        width={400}
        height={20}
      />
      <Skeleton
        width={400}
        height={20}
      />
    </Wrapper>
  );
}

export default LoadingOthers;
