import React from "react";
import styled from "styled-components";

import Badge from "../../components/Shared/Badge";

const UserInfo = ({ selectedUser }) => {
  const { name, picture } = selectedUser;

  return (
    <Wrapper>
      <span>
        <img src={picture} alt={name} />
      </span>
      {name ?
        <>
          <b>{name}</b>
          <Badge color="green">Treating</Badge>
        </> : <>
          <p>대기 환자를 선택해주세요.</p>
          <Badge>Waiting</Badge>
        </>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 20px;

  b {
    display: inline-block;
    margin-left: 12px;
    font-size: 18px;
    font-weight: 600;
  }

  span {
    display: inline-block;
    font-size: 12px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e9e9e9;

    img {
        display: inline-block;
        width: 40px;
        object-fit: cover;
        border-radius: 50%;
        vertical-align: middle;
      }
  }

  p {
    display: inline-block;
    margin-left: 15px;
    font-size: 14px;
    line-height: 45px;
    vertical-align: top;
    color: #222;
  }

  em {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export default UserInfo;
