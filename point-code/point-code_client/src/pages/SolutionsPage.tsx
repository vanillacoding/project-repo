import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import SolutionListContainer from '../containers/solutions/SolutionListContainer';

const SolutionsPage = () => (
  <>
    <Helmet>
      <title>Point Code - solution</title>
    </Helmet>
    <HeaderContainer />
    <SolutionListContainer />
  </>
);

export default SolutionsPage;
