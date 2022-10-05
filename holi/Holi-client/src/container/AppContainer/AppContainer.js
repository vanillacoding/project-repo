import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setCountryId, setUserData } from '../../action/index';

import Map from '../../component/Map/Map';
import Login from '../../component/Login/Login';
import Country from '../../component/Country/Country';
import LikeList from '../../component/LikeList/LikeList';
import CommentList from '../../component/CommentList/CommentList';
import HashtagList from '../../component/HashtagList/HashtagList';

function AppContainer({ user, setUser, country, setCountry }) {
  return (
    <Router>
      <Switch>

        <Route
          exact
          path='/'
          render={() => <Map onSetCountry={setCountry} user={user} onSetUser={setUser} />}
        />

        <Route
          path='/login'
          render={() => <Login onSetUser={setUser} />}
        />

        <Route
          path='/countries/:country_id'
          render={() => <Country country={country} user={user} onSetUser={setUser} />}
        />

        <Route
          path='/users/:user_id/comments'
          render={() => <CommentList user={user} onSetUser={setUser} />}
        />

        <Route
          path='/users/:user_id/likes'
          render={() => <LikeList user={user} onSetCountry={setCountry} onSetUser={setUser} />}
        />

        <Route
          path='/hashtags/:hashtag_id'
          render={() => <HashtagList country={country} user={user} onSetUser={setUser} />}
        />

      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  country: state.country
});

const mapDispatchToProps = dispatch => ({
  setUser(user) {
    dispatch(setUserData(user));
  },
  setCountry(countryId) {
    dispatch(setCountryId(countryId));
  }
});

AppContainer.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
  setCountry: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
