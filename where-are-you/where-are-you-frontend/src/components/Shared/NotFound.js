import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import NotFoundImage from "../../assets/common/not_found.png";
import LinkButton from "./LinkButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.div`
  width: 300px;
  height: 281px;
  background: url(${NotFoundImage}) no-repeat center;
  position: relative;
`;

const Title = styled.p`
  width: 110px;
  position: absolute;
  top: 35px;
  right: 20px;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.5rem;
  text-align: center;
  white-space: pre-line;
`;

const Text = styled.p`
  margin: 0.8rem 0 0;
  font-size: 1.3rem;
`;

function NotFound({ title, text }) {
  return (
    <Wrapper>
      <Image>
        <Title>{title}</Title>
      </Image>
      <Text>{text}</Text>
      <LinkButton
        path="/"
        title="메인으로 가기"
        color="black"
      />
    </Wrapper>
  );
}

NotFound.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
};

NotFound.deafultProps = {
  title: "404\nNotFound",
  text: "이런... 존재하지 않는 페이지입니다."
};

export default NotFound;
