import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as ICON from 'react-feather';
import useModal from '../../../hooks/useModal';
import Modal from '../../shared/Modal';
import isEmptyObject from '../../../utils/isEmptyObject';
import LinkForm from '../../shared/LinkForm';
import ConfigIcon from '../../shared/Config/Config';

const DEFAULT_DATA = {
  contents: {
    facebookLink: '',
    twitterLink: '',
    youtubeLink: '',
  },
};

export default function Socials({
  data,
  index,
  isActive,
  resetBlockContents,
}) {
  const links = (isEmptyObject(data)) ? DEFAULT_DATA.contents : data.contents;

  const {
    facebookLink,
    twitterLink,
    youtubeLink,
  } = links;

  const { modalOpen, toggle, setModalOpen } = useModal();

  function handleSubmitForm(newContents) {
    resetBlockContents(index, newContents);
    setModalOpen(false);
  }

  return (
    <>
      <SocialsContainer>
        <SocialIcon
          target='_blank'
          bgColor='#408bdb'
          href={facebookLink}
        >
          <ICON.Facebook fill='white' />
        </SocialIcon>
        <SocialIcon
          target='_blank'
          href={twitterLink}
          bgColor='#52bfff'
        >
          <ICON.Twitter fill='white' />
        </SocialIcon>
        <SocialIcon
          target='_blank'
          href={youtubeLink}
          bgColor='#df3220'
        >
          <ICON.Youtube fill='white' />
        </SocialIcon>
      </SocialsContainer>
      {isActive && (
        <ConfigIcon onClick={toggle} />
      )}
      {modalOpen && (
        <Modal
          handleClose={() => setModalOpen(false)}
          title='Change Social Links'
        >
          <LinkForm
            inputs={links}
            handleSubmitForm={handleSubmitForm}
          />
        </Modal>
      )}
    </>
  );
}

Socials.propTypes = {
  data: PropTypes.shape({
    contents: PropTypes.object,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  resetBlockContents: PropTypes.func,
};

const SocialsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  margin: auto;
`;

const SocialIcon = styled.a`
  background: ${({ bgColor }) => bgColor ?? 'white'};
  border-radius: 50%;
  padding: 5%;
  line-height: 0;
  cursor: pointer;
`;
