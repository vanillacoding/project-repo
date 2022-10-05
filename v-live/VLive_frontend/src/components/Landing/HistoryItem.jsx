import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

export default function HistoryItem({ channel: { name, episode } }) {
  return (
    <Wrapper>
      <span className="channel-name">{name}</span>
      <span className="episode-title">{episode.title}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  height: 70px;
  margin: 10px auto;
  cursor: pointer;
  border-bottom: 1px solid #575757;
  color: ${({ theme }) => theme.white};

  &:hover {
    border-bottom: 2px solid ${theme.white};
    color: ${({ theme }) => theme.pink};
  }

  .channel-name {
    display: block;
    font-size: 1.2em;
    font-weight: 500;
    margin-bottom: 7px;
  }

  .episode-title {
    font-weight: 100;
    font-size: 1em;
  }
`;

HistoryItem.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
    episode: PropTypes.object.isRequired,
  }),
};
