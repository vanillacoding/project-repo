import React from 'react';
import PropTypes from 'prop-types';

import NotFoundPage from '../../components/error/404';
import InternalError from '../../components/error/500';

export default function Error({ errorStatus }) {
  const isError404 = errorStatus === 404;
  return (
    <>
      {isError404 && <NotFoundPage />}
      {!isError404 && <InternalError />}
    </>
  );
}

Error.propTypes = {
  errorStatus: PropTypes.number,
};

Error.defaultProps = {
  errorStatus: 500,
};
