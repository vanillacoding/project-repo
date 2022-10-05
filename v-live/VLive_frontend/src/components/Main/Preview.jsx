import React, { useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

import useEpisodes from '../../hooks/channel/useEpisodes';

import EpisodeVideo from './EpisodeVideo';
import Modal from '../Modal';
import ErrorBox from '../ErrorBox';

export default function Preview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [episode, setEpisode] = useState(null);
  const { episodes, error } = useEpisodes();

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  function openModal(episode) {
    setEpisode(episode);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <PreviewContainer>
      <h2 className="preview-title">Episode preview</h2>
      <List>
        {episodes?.map((episode) => {
          return (
            <div
              className="episode"
              key={episode._id}
              onClick={() => openModal(episode)}
            >
              <h3 className="episode-title">{episode.title}</h3>
              <div className="episode-thumbnail">
                <Image
                  src={episode.thumbnail}
                  alt="Episode thumbnail"
                  width={200}
                  height={100}
                />
              </div>
            </div>
          );
        })}
      </List>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <EpisodeVideo onClose={closeModal} episode={episode}></EpisodeVideo>
        </Modal>
      )}
    </PreviewContainer>
  );
}

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 65%;

  .preview-title {
    margin: 2px;
    color: white;
    font-weight: 500;
    font-size: 1.2em;
  }
`;

const List = styled.div`
  .episode-title {
    font-weight: 300;
    font-size: 1em;
    color: white;
  }

  .episode {
    padding-bottom: 10px;
  }

  .episode-thumbnail {
    margin: 0px auto 10px 0;
  }
`;
