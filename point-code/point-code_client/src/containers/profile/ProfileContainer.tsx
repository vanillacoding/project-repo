import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMedia } from 'use-hooks';
import cogoToast from 'cogo-toast';
import { MUST_BE_LOGGED_IN } from '../../lib/constants/warnMessage';
import { getTotalCounts, getLastWeekCounts } from '../../lib/utils/helper';
import { RootState } from '../../modules';
import Profile from '../../components/profile/Profile';

const ProfileContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const history = useHistory();
  const chartSize = useMedia(['(max-width: 48rem)', '(max-width: 64rem)'], [360, 420], 500);

  if (!user) {
    cogoToast.warn(MUST_BE_LOGGED_IN);
    history.push('/users/login');

    return null;
  }

  const totalCounts = getTotalCounts(user);
  const lastWeekCounts = getLastWeekCounts(user);

  return (
    <Profile
      user={user}
      chartSize={chartSize}
      totalCounts={totalCounts}
      lastWeekCounts={Object.entries(lastWeekCounts)}
    />
  );
};

export default ProfileContainer;
