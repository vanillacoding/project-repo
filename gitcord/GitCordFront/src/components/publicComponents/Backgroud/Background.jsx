import React from "react";
import styled from "styled-components";

import backgroundImage from "../../../assets/images/backgroundImage.png";

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-repeat: none;
  background-position: center;
  background-size: cover;
`;

function Background({ children }) {
  return (
    <BackgroundContainer image={backgroundImage}>
      { children }
    </BackgroundContainer>
  );
}

export default Background;
