import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import ProfileContainer from '../containers/profile/ProfileContainer';

const ProfilePage = () => (
  <>
    <Helmet>
      <title>Point Code - profile</title>
    </Helmet>
    <HeaderContainer />
    <ProfileContainer />
  </>
);

export default ProfilePage;
