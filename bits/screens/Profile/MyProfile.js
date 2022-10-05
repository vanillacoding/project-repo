import React from 'react';
import { useSelector } from 'react-redux';

import Profile from '../../components/ProfileBoard/Profile/Profile';
import TopNav from '../../components/shared/TopNav/TopNav';

const MyProfile = () => {
  const user = useSelector(state => state.user);

  return (
    <>
      <TopNav />
      <Profile
        userInfo={user}
        imageUri={user.imageUri}
      />
    </>
  );
};

export default MyProfile;
