import React from "react";
import { useSelector } from "react-redux";

import AuthStackNavigation from "../AuthStackNavigation/AuthStackNavigation";
import UserScreenNavigation from "../UserScreenNavigation/UserScreenNavigation";

const MainStackNavigation = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.email
        ? <UserScreenNavigation />
        : <AuthStackNavigation />
      }
    </>
  );
}

export default MainStackNavigation;
