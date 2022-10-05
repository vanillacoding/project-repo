import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

import FormBase from "../../styles/shared/formBase";

import * as actions from "../../reducers/user";
import { form, message } from "../../constants";

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
`;

const schema = yup.object().shape({
  [form.name]: yup.string().required(),
  [form.email]: yup.string().email().required(),
  [form.password]: yup.string().min(4).max(15).required(),
  [form.checkPassword]: yup.string().oneOf([yup.ref(form.password), null]).required(),
});

const SignupForm = () => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(actions.signupRequest(data));
  };

  return (
    <Wrapper>
      <FormBase>
        <div className="title" >
          <h1>Create</h1>
          <h1>Accout</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input" >
            <input type="text" {...register(form.name)} placeholder={form.name} />
            <span>{errors.name && message.errorName}</span>
          </div>

          <div className="form-input">
            <input type="email" {...register(form.email)} placeholder={form.email} />
            <span>{errors.email && message.errorEmail}</span>
          </div>

          <div className="form-input">
            <input type="password" {...register(form.password)} placeholder={form.password} />
            <span>{errors.password && message.errorPassword}</span>
          </div>

          <div className="form-input">
            <input type="password" {...register(form.checkPassword)} placeholder={form.checkPassword} />
            <span>{errors.checkPassword && message.errorCheckPassword}</span>
          </div>

          <div className="submit">
            <button type="submit" >Signup</button>
          </div>
        </form>
      </FormBase>
      <span className="notice">We will find your taste in music. Just check.</span>
    </Wrapper>
  );
};

export default SignupForm;
