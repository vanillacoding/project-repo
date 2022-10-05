import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import ProblemListContainer from '../containers/problems/ProblemListContainer';
import PaginationContainer from '../containers/problems/PaginationContainer';

const ProblemsPage = () => (
  <>
    <Helmet>
      <title>Point Code - Problems</title>
    </Helmet>
    <HeaderContainer />
    <ProblemListContainer />
    <PaginationContainer />
  </>
);

export default ProblemsPage;
