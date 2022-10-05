import React from "react";

import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 160px;
  padding: 10px;
  background-color: ${({ theme }) => theme.skeletonColor.box};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoadingSlider = styled.div`
  width: 100%;
  height: 10px;
  margin: 40px 0 30px 0;
`;

const LoadingInfoList = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

function LoadingBettingOption() {
  return (
    <Wrapper>
      <LoadingSlider>
        <Skeleton
          width="100%"
          height={10}
        />
      </LoadingSlider>
      <LoadingInfoList>
        <Skeleton
          width={120}
          height={30}
        />
        <Skeleton
          width={120}
          height={50}
        />
      </LoadingInfoList>
    </Wrapper>
  );
}

export default LoadingBettingOption;
