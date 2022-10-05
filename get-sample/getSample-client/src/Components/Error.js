import React from 'react';
import stateNames from '../Constants/stateNames';
// import './Error.scss';
import './Common.scss';

function Error(props) {
  const { isLoggedIn, userInfo, resetStateOf } = props;
  const { SELECTED, DICTIONARY, VIDEOS } = stateNames;

  return (
    <div className="Error">This is 404 Error page! There is no results!</div>
  );
}

export default Error;
