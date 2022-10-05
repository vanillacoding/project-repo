import React from "react";

import styled from "styled-components";

import mobileImage from "../../assets/common/mobile.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 250px;
  height: 155px;
  position: relative;
`;

const Text = styled.p`
  margin: 0.8rem 0 0;
  font-size: 1.3rem;
  text-align: center;
`;

function Mobile() {
  return (
    <Wrapper>
      <Image src={mobileImage} alt="모바일 이미지" />
      <Text>
        모바일에서는 플레이 할 수 없어요..
        <br/>
        PC를 이용해주세요!
      </Text>
    </Wrapper>
  );
}

export default Mobile;
