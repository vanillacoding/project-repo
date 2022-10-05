import React from "react";
import styled from "styled-components";

const Header = ({ userInfo }) => {
  const { name, picture } = userInfo;

  return (
    <Wrapper>
      <div>
        {name && (
          <>
            <Text>Welcome, {name}</Text>
            <ImageBox>
              <img
                alt={name}
                src={picture}
              />
            </ImageBox>
          </>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  height: 55px;
  padding: 0 20px;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};

  div {
    display: flex;
    margin-left: auto;
    align-items: center;
  }
`;

const Text = styled.span`
  margin-right: 10px;
  font-size: 14px;
`;

const ImageBox = styled.span`
  width: 40px;

  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;

export default Header;
