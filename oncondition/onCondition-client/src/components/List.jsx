import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";

const Li = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto;
  line-height: 4rem;
  max-width: 630px;
  min-width: 440px;
  border-radius: 30px;
  box-shadow: ${({ theme }) => theme.shadow.main};
  background: ${(props) => props.color};
  color: ${({ theme }) => theme.text.button};
  list-style: none;

  img {
    margin: 0 auto;
    width: 80px;
    height: 3rem;
    object-fit: cover;
  }

  @media screen and (max-width: 440px) {
    flex-direction: column;
    width: calc(100% - 20px);
    min-width: 0;
    padding-top: 20px;

    div {
      height: 1.5rem;
    }

    img {
      width: 50%;
      height: 100px;
    }
  }
`;

function List({
  color,
  children,
  onClick,
}) {
  return (
    <Li
      color={color}
      onClick={onClick}
    >
      {children}
    </Li>
  );
}

List.propTypes = {
  color: PropTypes.oneOf(Object.values(theme.background)),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
};

export default List;
