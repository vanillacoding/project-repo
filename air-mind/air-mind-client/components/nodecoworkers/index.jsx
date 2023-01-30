import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProfileIcon from '../shared/profileicon';

export default function NodeCoworkers({ x, y, socketUsers }) {
  return (
    <foreignObject x={x} y={y + 30} width={120} height={50}>
      <Icons>
        {socketUsers.map(profile => {
          return (
            <ProfileIcon
              key={profile}
              src={profile || 'guest'}
              art="currentUserLocation"
            />
          );
        })}
      </Icons>
    </foreignObject>
  );
}

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  max-width: 150px;
  height: 50px;
`;

NodeCoworkers.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  socketUsers: PropTypes.array.isRequired,
};
