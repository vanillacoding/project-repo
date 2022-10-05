import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export default function InterviewEndPage() {
  return (
    <Wrapper>
      <h1>면접이 종료되었습니다.</h1>
      <h2>빠른시일 내로 연락드리겠습니다. 면접에 응해주셔서 감사합니다.</h2>
    </Wrapper>
  );
}
