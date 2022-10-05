import React, { useEffect, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FavoriteArtists from '../components/users/FavoriteArtists';
import Profile from '../components/users/Profile';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';

import history from '../lib/history';
import { setTokenToHeader } from '../lib/auth';
import { logout } from '../actions/auth.actions';
import { getArtists, selectArtist, deselectArtist, saveFavoriteArtists, clearPostResult, getProfile } from '../actions/user.actions';

const UserContainer = ({
  userId,
  loading,
  artistList,
  selectedArtists,
  postResult,
  userProfile,
  getArtists,
  selectArtist,
  deselectArtist,
  saveFavoriteArtists,
  clearPostResult,
  getProfile,
  logout
}) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    setTokenToHeader(token);
  }, []);

  useEffect(() => {
    if (postResult === 'success') {
      clearPostResult();
      return history.push('/waiting');
    }

    getArtists(userId);

    // eslint-disable-next-line
  }, [ userId, postResult ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        {window.location.pathname.includes('profile') ?
          <Fragment>
            <Link to='/waiting'>Game</Link>
            <button onClick={logout}>Logout</button>
          </Fragment> :
          Object.keys(selectedArtists).length >= 5 &&
            <button onClick={() => saveFavoriteArtists(userId, selectedArtists)}>Next</button>}
      </Navbar>
      <Route exact path={`/users/${userId}/favorites`}>
        <FavoriteArtists
          loading={loading}
          artistList={artistList}
          selectedArtists={selectedArtists}
          onSelect={selectArtist}
          onDeselect={deselectArtist}
        />
      </Route>
      <Route exact path={`/users/${userId}/profile`}>
        <Profile
          userId={userId}
          userProfile={userProfile}
          requestData={getProfile}
        />
      </Route>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  loading: state.user.loading,
  artistList: state.user.artistList,
  selectedArtists: state.user.selectedArtists,
  postResult: state.user.result,
  userProfile: state.user.userProfile
});

const mapDispatchToProps = dispatch => ({
  getArtists: getArtists(dispatch),
  selectArtist: selectArtist(dispatch),
  deselectArtist: deselectArtist(dispatch),
  saveFavoriteArtists: saveFavoriteArtists(dispatch),
  clearPostResult: clearPostResult(dispatch),
  getProfile: getProfile(dispatch),
  logout: logout(dispatch)
});

UserContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  artistList: PropTypes.array.isRequired,
  selectedArtists: PropTypes.object.isRequired,
  postResult: PropTypes.string.isRequired,
  userProfile: PropTypes.object.isRequired,
  getArtists: PropTypes.func.isRequired,
  selectArtist: PropTypes.func.isRequired,
  deselectArtist: PropTypes.func.isRequired,
  saveFavoriteArtists: PropTypes.func.isRequired,
  clearPostResult: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
