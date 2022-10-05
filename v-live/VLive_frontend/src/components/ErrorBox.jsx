import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Button from '../components/Button';

export default function ErrorBox({ message }) {
  return (
    <>
      <p>{message}</p>
      <Link href="/" passHref>
        <a>
          <Button color="red">홈으로 돌아가기</Button>
        </a>
      </Link>
    </>
  );
}

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired,
};
