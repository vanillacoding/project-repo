import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { selectUser } from '../features/user/selectors';
import { initLogin } from '../features/user/slices';

export default function LoginLoadingPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.id) {
      history.push('/menu');
    } else {
      dispatch(initLogin());
    }
  }, [user]);

  return (
    <>
      <div>유저 프로필을 불러오는 중입니다.</div>
    </>
  );
}
