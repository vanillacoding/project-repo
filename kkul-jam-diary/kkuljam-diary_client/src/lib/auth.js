import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export const checkAuth = (page, isEnterance) => {
  const isAuthenticated = localStorage.tokenId && localStorage.accessToken;

  if (!isAuthenticated && !isEnterance) return <Redirect to="/login" />;
  if (isEnterance) return <Redirect to="/home" />;
  return page;
};

export const setHeader = accessToken => {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
