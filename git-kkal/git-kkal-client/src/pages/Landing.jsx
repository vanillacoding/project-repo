import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import UrlForm from '../components/UrlForm';
import UI from '../constants/ui';

export default function Landing({ handleRepoUrlSubmit }) {
  return (
    <Wrapper>
      <TopWrapper>
        <TitleWrapper>
          <div>
            <a href="#">{UI.TITLE}</a>
          </div>
        </TitleWrapper>
      </TopWrapper>
      <InputWrapper>
        <UrlForm handleSubmit={handleRepoUrlSubmit} />
      </InputWrapper>
      <BottomWrapper />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  background-color: ${({ theme: { background } }) => background.black};
  color: ${({ theme: { font } }) => font.grey};
  flex-direction: column;
`;

const TopWrapper = styled.div`
  display: flex;
  min-height: 260px;
  height: calc(100% - 560px);
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
`;

const TitleWrapper = styled.div`
  display: block;
  position: relative;
  max-height: 92px;
  height: 100%;
  margin-top: auto;

  div {
    display: block;
    position: relative;
    margin: 150px;
    width: 500px;
    max-height: 92px;
    margin-top: auto;
    letter-spacing: -5px;
    text-align: center;
    font-size: 75px;
    font-family: Verdana, Geneva, sans-serif;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
      0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
      0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
      0 20px 20px rgba(255, 255, 255, 255);

    a {
      max-width: 100%;
      width: auto;
      max-height: 100%;
      height: 92px;
      color: white;
      text-decoration: none;
      object-fit: contain;
      object-position: center bottom;
      aspect-ratio: auto 272 / 92;
    }

    a:hover {
      color: #ccc;
    }
  }
`;

const InputWrapper = styled.div`
  display: block;
  max-height: 160px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-align: center;
  box-sizing: border-box;
`;

const BottomWrapper = styled.div`
  display: block;
  flex-grow: 1;
  flex-shrink: 0;
  box-sizing: border-box;
`;

Landing.propTypes = {
  handleRepoUrlSubmit: PropTypes.func.isRequired,
};
