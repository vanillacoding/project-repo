import React from 'react';
import loading from '../../lib/img/loading.gif';
import '../App/App.css';

const Loading = () => (
  <div className="loadingWrapper">
    <img src={loading} className="loading" alt="loading" />
  </div>
);

export default Loading;
