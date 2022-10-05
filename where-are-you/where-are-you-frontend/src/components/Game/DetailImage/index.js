import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Content = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.padding.big};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextBox = styled.div`
  width: 100%;
  height: auto;
  margin: 0.5rem 0 0 0;
  padding: 0.5rem;
`;

function DetailImage({ image, name, text }) {
  return (
    <Content>
      <img src={image} alt={name} />
      <TextBox>
        {text}
      </TextBox>
    </Content>
  );
}

DetailImage.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default DetailImage;
