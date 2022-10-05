import React from "react";

import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 50%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

function LoadingTeam() {
  return (
    <Wrapper>
      <Skeleton
        circle={true}
        width={65}
        height={65}
      />
      <Skeleton
        count={2}
        width={80}
        height={15}
      />
    </Wrapper>
  );
}

export default LoadingTeam;
