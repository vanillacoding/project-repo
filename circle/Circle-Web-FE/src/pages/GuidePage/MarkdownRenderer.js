import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer() {
  const codeSnippet = `
  \`\`\`
  (function () {
    function postUserInfo() {
      window.q = arguments;
    }

    window.circle = postUserInfo;

    function async_load() {
      if (window.CircleInitialized) {
        return;
      }

      window.CircleInitialized = true;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src =
        "https://cdn.jsdelivr.net/gh/Team-TTT/Circle-script@ttt/circleScript/index.js";
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    if (document.readyState === "complete") {
      async_load();
    } else if (window.attachEvent) {
      window.attachEvent("onload", async_load);
    } else {
      window.addEventListener("DOMContentLoaded", async_load, false);
      window.addEventListener("load", async_load, false);
    }
  })();

  // 사용자 입력 부분
  circle("projectId", "secretKey")
  \`\`\`
  `;

  const cdnText = `
  \`\`\`
  <script src="https://cdn.jsdelivr.net/gh/Team-TTT/Circle-script@ttt-1/snippet/index.js"></script>
  <script>circle("projectId", "secretKey")</script>
  \`\`\`
  `;

  return (
    <MarkDownWrapper>
      <Title>서비스 이용 방법</Title>
      <Description>
        <b>프로젝트 생성시 제공되는 key</b>를 아래 제공되는 CDN 또는 코드
        스니펫에 넣으면, circle 서비스를 이용하실 수 있습니다.
      </Description>
      <br />
      <ListWrapper>1. CDN</ListWrapper>
      <StyledCode>
        <ReactMarkdown>{cdnText}</ReactMarkdown>
      </StyledCode>
      <br />
      <ListWrapper>2. 코드 스니펫</ListWrapper>
      <StyledCode>
        <ReactMarkdown>{codeSnippet}</ReactMarkdown>
      </StyledCode>
    </MarkDownWrapper>
  );
}

const MarkDownWrapper = styled.div`
  font-size: 16px;
  list-style: none;
`;

const Description = styled.p`
  font-size: 18px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
`;

const ListWrapper = styled.li`
  font-size: 18px;
  margin: 5px;
`;

const StyledCode = styled.div`
  padding: 18px;
  background-color: #f8f4ec;
  font-size: 16px;
  color: #6b6a69;
  white-space: pre-wrap;
`;
