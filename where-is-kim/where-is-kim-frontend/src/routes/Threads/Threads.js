import React from "react";
import ThreadListWithDivider from "../../components/ThreadListWithDivider/ThreadListWithDivider";
import styled from "styled-components";

export default function Threads({ threads }) {
  return (
    <Wrapper>
      {threads.map((thread) => (
        <ThreadListWithDivider key={thread.date} thread={thread} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;
