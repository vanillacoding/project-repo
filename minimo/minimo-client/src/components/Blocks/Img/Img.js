import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as ICON from 'react-feather';
import useModal from '../../../hooks/useModal';
import Modal from '../../shared/Modal';
import ConfigIcon from '../../shared/Config/Config';
import LinkForm from '../../shared/LinkForm';
import ImgUploader from '../../shared/ImgUploader';

const defaultImgContents = {
  src: 'https://i.pinimg.com/originals/55/51/4d/55514dfd272080a0f6f0e2074205aa80.jpg',
};

export default function Img({
  data,
  index,
  isActive,
  resetBlockContents,
}) {
  const [isInputTypeLink, setIsInputTypeLink] = useState(true);
  const { modalOpen, setModalOpen, toggle } = useModal();
  const contents = data.contents ?? defaultImgContents;

  function handleSubmitForm(updatedData) {
    resetBlockContents(index, updatedData);
    setModalOpen(false);
  }

  return (
    <>
      <Image src={contents.src} alt='img' />
      {modalOpen && (
        <Modal
          handleClose={() => setModalOpen(false)}
        >
          <ButtonsContainer>
            <IconButton onClick={() => setIsInputTypeLink(true)}>
              <ICON.Link color='white' />
            </IconButton>
            <IconButton onClick={() => setIsInputTypeLink(false)}>
              <ICON.File color='white' />
            </IconButton>
          </ButtonsContainer>
          {isInputTypeLink
            ? (
              <LinkForm
                inputs={contents}
                handleSubmitForm={handleSubmitForm}
              />
            )
            : (
              <ImgUploader
                handleUpload={handleSubmitForm}
              />
            )}
        </Modal>
      )}
      {isActive && (
        <ConfigIcon onClick={toggle} />
      )}
    </>
  );
}

Img.propTypes = {
  data: PropTypes.shape({
    contents: PropTypes.object,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  resetBlockContents: PropTypes.func,
};

const IconButton = styled.div`
  display: inline-block;
  width: fit-content;
  background: rgba(0, 0, 0, 0.15);
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;

const ButtonsContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
`;
