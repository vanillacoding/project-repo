import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";

const Background = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.4rem;
  height: 95vh;
  background: ${(props) => props.theme.bg.color};
  background-image: linear-gradient(rgba(129, 129, 129, 0.7) .1em, transparent .1em), linear-gradient(90deg, rgba(129, 129, 129, 0.7) .1em, transparent .1em);
  background-size: 1.5em 1.5em;
`;

const BorderWrapper = styled.div`
  width: 85%;
  min-width: 900px;
  padding: 1.5rem;
  background: ${(props) => props.theme.layoutBg1.color};
  border: 1px solid ${(props) => props.theme.layoutBorder1.color};
  border-radius: 10px;
`;

const ContentsWrapper = styled.div`
  z-index: 0;
  position: relative;
  display: flex;
  height: 100%;
  padding: 1.3rem 0.5rem;
  background: ${(props) => props.theme.layoutBg2.color};
  border: 2px dashed ${(props) => props.theme.layoutBorder2.color};
  border-radius: 10px;
`;

const Layout = ({ main }) => (
  <Background>
    <BorderWrapper>
      <ContentsWrapper>
        {main}
      </ContentsWrapper>
    </BorderWrapper>
    <Sidebar />
  </Background>
);

Layout.propTypes = {
  main: PropTypes.any.isRequired,
};

export default Layout;
