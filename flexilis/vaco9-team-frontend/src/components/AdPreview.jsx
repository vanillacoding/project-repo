import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import popupVideoImage from '../assets/popup-video-image-mockup.jpg';

const Container = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 999;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: white;
  padding: 1rem;
  width: 700px;
  height: 500px;
  border-radius: 20px;
  font-family: 'Nanum Barun Gothic';
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  margin: 10px;
`;

const Popup = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
`;

const PopupImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Banner = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER}
  }
`;

export default function AdPreview({ imageUrl, setIsAdPreview }) {
  return (
    <Container>
      <Wrapper>
        <ImageContainer>
          <Popup>
            <PopupImage src={popupVideoImage} />
          </Popup>
          <Banner>
            {imageUrl && <BannerImage src={imageUrl} />}
          </Banner>
        </ImageContainer>
        <CloseButton onClick={() => setIsAdPreview(false)}>확인</CloseButton>
      </Wrapper>
    </Container>
  );
}

AdPreview.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  setIsAdPreview: PropTypes.func.isRequired,
};
