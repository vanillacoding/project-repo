import React from "react";
import firebase from "../config/firebase";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { postLogin } from "../api";

import Button from "../components/Shared/Button";
import Error from "../components/Shared/Error";
import Loading from "../components/Shared/Loading";
import { PageTitle, PageContent } from "../components/Base";

const Login = ({ onSuccess, setIsSignedIn }) => {
  const history = useHistory();

  const { mutate, isLoading, error, isError } = useMutation(postLogin, {
    onSuccess: (result) => {
      const { data } = result;

      onSuccess(data);
      setIsSignedIn(true);

      history.push("/");
    },
  });

  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { additionalUserInfo } = await firebase.auth().signInWithPopup(provider);
      const { email, name, picture } = additionalUserInfo.profile;

      const userData = {
        name,
        email,
        picture,
        user_type: "pharmacist",
      };

      mutate(userData);
    } catch (error) {

    }
  };

  return (
    <StyledPageContent>
      <div>
        <PageTitle className="sr-only">Login</PageTitle>

        <strong>Welcome back!</strong>
        <p>Sign in to your account to continue</p>

        <ButtonBox>
          <StyledButton type="button" onClick={loginWithGoogle}>Google Login</StyledButton>
        </ButtonBox>
      </div>
    </StyledPageContent>
  );
};

const StyledPageContent = styled(PageContent)`
  display: flex;
  justify-content: center;
  align-items: center;

  div > * {
    display: block;
    text-align: center;
  }

  strong {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  p {
    margin-top: 28px;
    font-size: 14px;
    color: #767676;
  }
`;

const ButtonBox = styled.div`
  margin-top: 35px;
  padding: 25px 30px 28px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
`;

const StyledButton = styled(Button)`
  padding: 10px 20px 10px 60px;
  border-radius: 5px;
  background: #2F49D1 url("/google-logo.png") no-repeat left center;
  background-position: 11px;
  font-size: 18px;
  color: #fff;

  span {
    display: inline-block;
    padding: 10px 10px 10px 50px;
  }
`;

export default Login;
