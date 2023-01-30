import React from "react";
import styled from "styled-components";
import theme from "../../config/constants/theme";
import MarkdownRenderer from "./MarkdownRenderer";

export default function GuidePage() {
  return (
    <Container>
      <GuideWrapper>
        <MarkdownRenderer />
      </GuideWrapper>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  background-color: ${theme.skyBlue};
`;

const GuideWrapper = styled.section`
  width: 1056px;
  min-height: 1056px;
  padding: 42px;
  margin: 36px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  border: none;
`;
