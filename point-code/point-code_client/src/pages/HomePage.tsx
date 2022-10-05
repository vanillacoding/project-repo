import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import Introduction from '../components/common/Introduction';

const HomePage = () => (
  <>
    <Helmet>
      <title>Point Code</title>
    </Helmet>
    <HeaderContainer />
    <Introduction />
  </>
);

export default HomePage;
