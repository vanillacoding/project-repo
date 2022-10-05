import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const List = styled.ul`
  width: 20px;
  height: auto;
  min-height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  background: #dddddd;

  li {
    height: 22px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: ${({ theme }) => theme.color.black};
    font-size: 0.6rem;
    text-align: right;
  }
`;

function Numbers({ line }) {
  return (
    <List>
      {Array
        .from({ length: line }, (_, i) => i + 1)
        .map((number, index) => (
          <li key={index}>{number}</li>
        ))}
    </List>
  );
}

Numbers.propTypes = {
  line: PropTypes.number.isRequired
};

export default Numbers;
