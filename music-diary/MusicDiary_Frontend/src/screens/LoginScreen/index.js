import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import LoginBtn from "../../components/LoginBtn";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handlePressLoginBtn = async () => {
    await dispatch(loginUser());
  };

  return <LoginBtn onPressLoginBtn={handlePressLoginBtn} />;
};

export default LoginScreen;
