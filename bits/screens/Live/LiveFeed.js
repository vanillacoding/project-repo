import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFollowingHabits } from '../../featrues/habitSlice';
import TopNav from '../../components/shared/TopNav/TopNav';
import Loading from '../Animations/Loading/Loading';

import MateHabit from '../../components/LiveBoard/MateHabit/MateHabit';
import MateRegister from '../../components/LiveBoard/MateRegister/MateRegister';

const LiveFeed = () => {
  const [isFetchingDone, setFetchingStatus] = useState(false);
  const { following } = useSelector(state => state.user);
  const { followingUserHabits, isFetching } = useSelector(state => state.habit);
  const dispatch = useDispatch();

  useEffect(() => {
    setFetchingStatus(true);
    dispatch(fetchFollowingHabits());
  }, [following]);

  if (isFetching || !isFetchingDone) {
    return <Loading />;
  }

  return (
    <>
      <TopNav />
        {following.length > 0
          ? <MateHabit
              followingUserHabits={followingUserHabits}
            />
          : <MateRegister />}
    </>
  );
};

export default LiveFeed;
