import React from "react";
import styled from "styled-components";

import bg_texture from "../../assets/bg_texture.png";
import bg_texture_fragment from "../../assets/bg_texture_fragment.png";

const Font = ({ children, className }) => {
  return (
    <Wrapper className={className}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: #222 url(${bg_texture_fragment});
  background-clip: text;
  font-family: "Druk XCond Web";
  color: transparent;

  :after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${bg_texture}) repeat 50%/300px 150px;
  }
`;

export default Font;
