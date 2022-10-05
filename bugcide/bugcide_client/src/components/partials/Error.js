import React from 'react';
import loadingImg from '../img/loading.gif';

const Error = (props) => {
  const { status, message } = props;

  return (
    <div className="loading-box">
      <div className="error-box">
        <h1>{status ? status : 'Error'}</h1>
        <p>
          {message ? message : 'Sorry. Something went wrong.'}
        </p>
        <a
          href="/"
          className="btn-error"
        >
          Go Home
        </a>
      </div>
      <img src={loadingImg} alt="loading" />
    </div>
  );
};

export default Error;

