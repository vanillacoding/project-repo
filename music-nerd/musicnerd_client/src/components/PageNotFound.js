import React, { useState, useEffect } from 'react';
import history from '../lib/history';
import DefaultLayout from './layout/DefaultLayout';

const PageNotFound = () => {
  const [ timer, setTimer ] = useState(3);

  useEffect(() => {
    const redirectTimer = setInterval(() => setTimer(prevTimer => prevTimer - 1), 1000);
    const redirectTimeout = setTimeout(() => history.push('/'), 3000);

    return () => {
      clearInterval(redirectTimer);
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <DefaultLayout>
      <h1 style={{ fontSize: '5rem', marginBottom: '2rem' }}>Page Not Found!</h1>
      <h3>{timer} 초 뒤 메인 화면으로 이동합니다.</h3>
    </DefaultLayout>
  );
};

export default PageNotFound;
