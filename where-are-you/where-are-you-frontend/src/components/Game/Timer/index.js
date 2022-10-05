import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { countClearTime } from "../../../actions/player";
import convertTime from "../../../utils/time";

const Wrapper = styled.div`
  padding: 0.3rem 0.5rem;
  position: absolute;
  top: -45px;
  left: calc((250px + 3rem) * -1);
  z-index: 1;
  background: ${({ theme }) => theme.color.black};
  color: #ffffff;
`;

const Label = styled.span`
  padding: 0 0.5rem 0 0;
`;

function Timer() {
  const clearTime = useSelector((state) => state.player.clearTime);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(countClearTime());
    }, 1000);
  }, [clearTime]);

  return (
    <Wrapper>
      <Label>PLAY TIME</Label>
      {convertTime(clearTime)}
    </Wrapper>
  );
}

export default Timer;
