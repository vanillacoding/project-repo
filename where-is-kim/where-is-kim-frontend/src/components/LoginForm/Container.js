import React from "react";
import LoginForm from "./LoginForm";
import useInput from "../../hooks/useInput";

export default function LoginFormContainer({ login }) {
  const email = useInput("");
  const password = useInput("");
  const onSubmit = (e) => {
    e.preventDefault();
    login(email.value, password.value);
  };

  return <LoginForm email={email} password={password} onSubmit={onSubmit} />;
}
