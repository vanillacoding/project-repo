import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../featrues/userSlice';

import Loading from '../Animations/Loading/Loading';
import TopNav from '../../components/shared/TopNav/TopNav';
import FollowMate from '../../components/SearchBoard/FollowMate';

const SearchMate = () => {
  const [isFetchingDone, setFetchingStatus] = useState(false);
  const { userName, allUsers, following, isFetching } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setFetchingStatus(true);
    dispatch(fetchUser());
  }, []);

  if (isFetching || !isFetchingDone) {
    return <Loading />;
  }

  return (
    <>
      <TopNav />
      <FollowMate
        allUsers={allUsers}
        following={following}
        userName={userName}
      />
    </>
  );
};

export default SearchMate;

