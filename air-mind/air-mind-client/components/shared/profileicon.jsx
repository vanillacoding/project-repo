import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ProfileIcon({ src, alt, size }) {
  const [url, setUrl] = useState(src);

  useEffect(() => {
    if (src === 'guest') {
      setUrl('/images/guest.png');
    } else {
      setUrl(src);
    }
  }, [url, src]);

  return src === 'guest' ? (
    <GuestIcon size={size}>guest</GuestIcon>
  ) : (
    <Icon src={url} alt={alt} size={size} />
  );
}

ProfileIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

const Icon = styled.img`
  width: ${props => (props.size === 'medium' ? '50px' : '30px')};
  height: ${props => (props.size === 'medium' ? '50px' : '30px')};
  border-radius: 50px;
`;

const GuestIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.size === 'medium' ? '50px' : '30px')};
  height: ${props => (props.size === 'medium' ? '50px' : '30px')};
  border-radius: 50px;
  background-color: gray;
`;
