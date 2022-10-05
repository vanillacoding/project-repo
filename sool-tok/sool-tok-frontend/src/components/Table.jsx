import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { getRandomEmoji } from '../utils/getRandomEmoji';

function Table({ id, title }) {
  return (
    <Link to={`/rooms/${id}`}>
      <Wrapper>
        {Array.from({ length: 18 }).map((_, idx) => {
          if (idx === 5) return (<div key={idx} className='table'>{title}</div>);
          if (idx === 2 || idx === 8 || idx === 9 || idx === 14) {
            return (<div key={idx} className='member'>{getRandomEmoji()}</div>);
          }
          return (<div key={idx} />);
        })}
      </Wrapper>
    </Link>
  );
}

const tableSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const heartBeat = keyframes`
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-template-areas:
    '. . . . .'
    '. t t t .'
    '. t t t .'
    '. t t t .'
    '. . . . .';
  width: 240px;
  height: 240px;
  margin: 20px;
  color: ${({ theme }) => theme.orange};
  animation: ${tableSpin} infinite 3s linear;

  .table {
    grid-area: t;
    border-radius: 36%;
    padding: 20px;
    font-size: 20px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.purple};
    border: 2px solid ${({ theme }) => theme.darkPurple};
    animation: ${heartBeat} infinite 1.6s linear;
  }

  .table,
  .member {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .member {
    font-size: 36px;
  }
`;

export default Table;

Table.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
