import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import * as actions from "../../reducers/user";

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.indigo};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.strong};
  padding: 1rem;
`;

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(actions.logoutRequest(profile));
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;
