import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

export default function Main() {
  return (
    <Container>
      {/* <MainText>
        Bring your ideas to life
      </MainText> */}
      {/* <PhoneDisplay
        src='https://api2.projector.com/v2/image/3c86df9c-2efb-4064-9901-ccffec67888d?width=1024'
        right='15rem'
        bottom='-4rem'
      />
      <PhoneDisplay
        src='/assets/sample2.png'
        right='39rem'
        bottom='-4rem'
      />
      <PhoneDisplay
        src='https://api2.projector.com/v2/image/66a1e182-de70-4761-9d0d-3459d5b95704?width=1024'
        left='15rem'
        bottom='-4rem'
      />
      <PhoneDisplay
        src='/assets/sample1.png'
        left='39rem'
        bottom='-4rem'
      /> */}
    </Container>
  );
}

function PhoneDisplay({
  src,
  top,
  left,
  bottom,
  right,
}) {
  return (
    <PhoneContainer
      top={top}
      left={left}
      bottom={bottom}
      right={right}
    >
      <PhoneHeader />
      <PhoneBody>
        <img src={src} alt='sample' />
      </PhoneBody>
      <PhoneFooter />
    </PhoneContainer>
  );
}

PhoneDisplay.propTypes = {
  src: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  top: PropTypes.string,
};

const PhoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;

  top: ${({ top }) => top && top};
  left: ${({ left }) => left && left};
  bottom: ${({ bottom }) => bottom && bottom};
  right: ${({ right }) => right && right};

  & div {
    border-top: 2.5px solid black;
    border-left: 2.5px solid black;
    border-right: 2.5px solid black;
    width: 300px;
  }
`;

const PhoneHeader = styled.div`
  height: 30px;
  border-radius: 25px 25px 0 0;
`;

const PhoneBody = styled.div`
  height: 30rem;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const PhoneFooter = styled.div`
  height: 30px;
  border-radius: 0 0 25px 25px;
  border-bottom: 2.5px solid black;
`;

const MainText = styled.div`
  margin-top: 10rem;
  width: 100%;
  text-align: center;
  font-family: Scto, Arial, sans-serif;
  font-weight: 300;
  font-size: 84px;
  line-height: 88px;
  letter-spacing: -6px;
  color: rgb(255, 255, 255);
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  width: 100%;
  /* height: 768px;
  overflow: hidden; */
  /* background: rgb(15, 65, 59); */
  /* padding: 40px; */
  box-sizing: border-box;
  display: flex;
  background-image: url('/assets/background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
