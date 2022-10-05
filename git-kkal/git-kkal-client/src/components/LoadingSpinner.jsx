import React from 'react';
import Loader from 'react-loader-spinner';

export default function LoadingSpinner() {
  return (
    <Loader
      type="Oval"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
    />
  );
}
