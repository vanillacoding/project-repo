import React from "react";
import styled from "styled-components";

function NotFound() {
  return (
    <ImageWrapper>
      <img alt="not_found_page" src="assets/image/not_found.png" />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export { NotFound };
