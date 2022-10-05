import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useModal from '../../../hooks/useModal';
import Modal from '../../shared/Modal';
import ConfigIcon from '../../shared/Config/Config';
import LinkForm from '../../shared/LinkForm';

const defaultVideoContents = {
  src: 'https://www.youtube.com/embed/3C4HKB0Wts8',
};

export default function Iframe({
  data,
  index,
  isActive,
  resetBlockContents,
}) {
  // FIXME: to have data.
  const contents = data?.contents ?? defaultVideoContents;
  const { modalOpen, setModalOpen, toggle } = useModal();

  function handleSubmitForm(updatedData) {
    resetBlockContents(index, updatedData);
    setModalOpen(false);
  }

  return (
    <>
      <VideoWrapper>
        <iframe
          width='100%'
          height='215'
          src={contents.src}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </VideoWrapper>
      {modalOpen && (
        <Modal
          handleClose={() => setModalOpen(false)}
          title='Change Video Link'
        >
          <LinkForm
            inputs={contents}
            handleSubmitForm={handleSubmitForm}
          />
        </Modal>
      )}
      {isActive && (
        <ConfigIcon onClick={toggle} />
      )}
    </>
  );
}

Iframe.propTypes = {
  data: PropTypes.shape({
    contents: PropTypes.object,
  }),
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  resetBlockContents: PropTypes.func,
};

const VideoWrapper = styled.div`
  width: 100%;

  & video {
    width: 100%;
  }
`;
