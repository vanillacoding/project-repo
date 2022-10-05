import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { logout } from '../../modules/auth';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <Header user={user} onLogout={handleLogout} />
  );
};

export default HeaderContainer;
