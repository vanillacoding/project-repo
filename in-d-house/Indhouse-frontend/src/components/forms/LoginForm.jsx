import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

import FormBase from "../../styles/shared/formBase";

import * as actions from "../../reducers/user";
import { form, socialType, message } from "../../constants";
import googleLogo from "../../assets/googleLogo.png";
import facebookLogo from "../../assets/facebookLogo.png";
import twitterLogo from "../../assets/twitterLogo.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .notice {
    margin-top: 2rem;
    color: ${({ theme }) => theme.colors.yellow};
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: ${({ theme }) => theme.fontWeights.strong};
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;

    button {
      background-color: ${({ theme }) => theme.colors.white};
      width: 3.7rem;
      padding: 0.5rem;
    }

    button:nth-child(3) {
      width: 2.9rem;
      margin-left: 0.4rem;
      padding: 0;
    }

    img {
      width: 100%;
    }
  }
`;

const schema = yup.object().shape({
  [form.email]: yup.string().required(),
  [form.password]: yup.string().min(4).max(15).required(),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(actions.localLoginRequest(data));
  };

  const handleLoginSocial = type => {
    dispatch(actions.socialLoginRequest(type));
  };

  return (
    <Wrapper>
      <FormBase>
        <div className="title" >
          <h1>Welcome</h1>
          <h1>Back</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="form-input" >
            <input type="email" {...register(form.email)} placeholder={form.email} />
            <span>{errors.email && message.errorEmail}</span>
          </div>
          <div className="form-input" >
            <input type="password" {...register(form.password)} placeholder={form.password} />
            <span>{errors.password && message.errorPassword}</span>
          </div>

          <div className="submit">
            <button type="submit" >Login</button>
          </div>
        </form>
        <div className="buttons" >
          <button onClick={() => handleLoginSocial(socialType.google)} >
            <img src={googleLogo} />
          </button>
          <button onClick={() => handleLoginSocial(socialType.facebook)} >
          <img src={facebookLogo} />
          </button>
          <button>
          <img src={twitterLogo} />
          </button>
        </div>
      </FormBase>
      <span className="notice">We will find your taste in music. Just check.</span>
    </Wrapper>
  );
};

export default LoginForm;
