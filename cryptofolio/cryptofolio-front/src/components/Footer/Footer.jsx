import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 40px;
  height: 60px;
  background-color: #0d1315;

  span {
    font-size: 0.8em;
    color: white;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <span> &copy; 2021 CryptoFolio. All rights reserved </span>
    </FooterContainer>
  );
};

export default Footer;
