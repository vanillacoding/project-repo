import React from 'react';
import loadingImg from '../img/loading.gif';

const Loading = () => {
  return (
    <div className="loading-box">
      <img src={loadingImg} alt="loading" />
    </div>
  );
};

export default Loading;
