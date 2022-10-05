import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DashboardItem = ({ src, color, number, text }) => {
  return (
    <Wrapper src={src} color={color}>
      <div>
        <em>{number}</em>
        <span>{text}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
  padding: 30px 10px;

  div {
    position: relative;
    min-width: 250px;
    padding: 35px 20px 35px 78px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    box-sizing: border-box;
  }

  div:before {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
    top: calc(50% - 23px);
    left: 18px;
    padding: 24px;
    background: ${(props) => props.color} url(${(props) => props.src}) no-repeat center;
  }

  div > * {
    display: block;
  }

  em {
    font-size: 18px;
    font-weight: 600;
  }

  span {
    margin-top: 10px;
    font-size: 14px;
    color: #B9B9B9;
  }
`;

DashboardItem.propTypes = {
  src: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default DashboardItem;
