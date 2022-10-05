import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title-top {
    text-align: left;
  }

  .title-bot {
    text-align: right;
  }

  .main-bot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1, h6 {
    color: ${({ theme }) => theme.colors.yellow};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: ${({ theme }) => theme.fontWeights.strong};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.small};
    margin: 2rem 0;
  }

  span {
    color: ${({ theme }) => theme.colors.blue};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  a {
    background-color: ${({ theme }) => theme.colors.yellow};
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 50px;
    color: ${({ theme }) => theme.colors.blue};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const LandingMain = () => {
  return (
    <Wrapper>
      <div>
        <h1 className="title-top">Find your taste</h1>
        <h1 className="title-bot">This House.</h1>
      </div>
      <div className="main-bot">
        <h6>We will find your taste in music. Just check.</h6>
        <Link to="/login" >
          Get Taste Free
        </Link>
      </div>
    </Wrapper>
  );
};

export default LandingMain;
