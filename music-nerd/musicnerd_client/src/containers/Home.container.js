import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import DefaultLayout from '../components/layout/DefaultLayout';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';

import history from '../lib/history';
import { logout } from '../actions/auth.actions';

const HomeContainer = ({ isAuthenticated, logout }) => {
  useEffect(() => {
    isAuthenticated && history.push('/waiting');
  }, [ isAuthenticated ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to='/auth/signup'>Sign Up</Link>
        {isAuthenticated ? <button onClick={logout}>Logout</button> : <Link to='/auth/login'>Login</Link>}
      </Navbar>
      <DefaultLayout>
        <Title>MUSIC NERD</Title>
        <SubTitle>Find out how nerdy you are in music.</SubTitle>
      </DefaultLayout>
    </Fragment>
  );
};

const Title = styled.h1`
  font-size: 8rem;
`;

const SubTitle = styled.p`
  font-size: 3rem;
  margin-top: 2rem;
`;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logout: logout(dispatch)
});

HomeContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
