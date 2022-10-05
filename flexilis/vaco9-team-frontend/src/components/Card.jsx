import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '90%'};
  height: fit-content;
  justify-content: flex-start;
  padding: 15px 15px 15px 0;
  margin-left: 30px;
`;

const CardTitle = styled.span`
  margin: 0 0 10px 0;
  padding-left: 10px;
`;

const CardItem = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 7px;
`;

export default function Card({ children, title }) {
  return (
    <Container>
      <CardItem>
        <CardTitle>
          {title}
        </CardTitle>
      </CardItem>
      <CardItem>
        {children}
      </CardItem>
    </Container>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
