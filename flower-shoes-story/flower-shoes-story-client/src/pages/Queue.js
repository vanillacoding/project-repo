import React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { updateUser } from "../api";
import { save } from "../features/userSlice";

import Background from "../components/Shared/Background";
import Button from "../components/Shared/Button";

const Queue = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { couple } = user;

  const { mutate } = useMutation(updateUser, {
    onSuccess: ({ result, data }) => {
      const { user } = data;

      if (result === "success") {
        dispatch(save(user));
        history.push("/chat");
      }
    },
  });

  const handleClickButton = () => {
    mutate({ user });
  };

  return (
    <Wrapper>
      {couple ? (
        <Inner>
          <Loading />
          <p>Waiting your partner's response...</p>
        </Inner>
      )
        :
        <Inner>
          <p>{user.partner_id}<span><br />has requested couple.</span></p>
          <p><span>Do you want to accept?</span></p>
          <Button type="button" onClick={handleClickButton}>ACCEPT</Button>
        </Inner>
      }
      <Background />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  font-size: 2vw;
  line-height: 1.5em;

  p {
    margin-top: 20px;
    font-family: "adrianna-extended";

    span {
      font-size: 15px;
      vertical-align: top;
    }
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loading = styled.div`
  margin: auto;
  border: 5px solid #EAF0F6;
  border-radius: 50%;
  border-top: 5px solid #222;
  width: 35px;
  height: 35px;
  animation: spinner 4s linear infinite;


  @keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Queue;
