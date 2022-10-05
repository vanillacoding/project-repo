import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  color: black;
`;

const Content = styled.div`
  font-size: 2rem;
`;

const Alert = styled.div`
  width: 600px;
  margin: 5rem 0 0 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  box-shadow: 3px 3px 15px -6px #000000;
`;

const Icon = styled.p`
  padding: 0 0 1rem 0;
  font-size: 4rem;
`;

const Title = styled.p`
  font-family: "Bebas Neue";
  font-size: 2.5rem;
`;

const Text = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`;

function Notification({ icon, title, text }) {
  return (
    <Wrapper>
      <Alert>
        <Icon>{icon}</Icon>
        <Content>
          <Title>{title}</Title>
          <Text>{text}</Text>
        </Content>
      </Alert>
    </Wrapper>
  );
}

Notification.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Notification;
