import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../lib/colors';

const Header = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  height: 20vh;
  width: 100%;
  padding: 1vh 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.4rem 0.2rem -0.2rem ${colors.BOX_SHADOW_COLOR};
`;

Header.propTypes = {
  children: PropTypes.node
};

export default Header;
