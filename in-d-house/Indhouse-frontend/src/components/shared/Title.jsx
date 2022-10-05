import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Title = styled.h1`
  margin: 0 0 10vh 3rem;
  font-size: ${({ theme }) => theme.fontSizes.miniTitleSize};
  font-weight: ${({ theme }) => theme.fontWeights.strong};
`;

const HeaderTitle = ({ title }) => {
  return (
    <Title>{title}</Title>
  );
};

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderTitle;
