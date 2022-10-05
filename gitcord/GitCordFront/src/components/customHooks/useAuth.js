import { useEffect } from "react";

import { postAuthToken } from "../../api/userApi";

export default function useAuth(
  dispatch,
  loginUser,
  setIsAuthuticate
) {
  useEffect(() => {
    const token = {
      accessToken: localStorage.getItem("access"),
      refreshToken: localStorage.getItem("refresh")
    };

    (async function checkUserInfo() {
      const response = await postAuthToken(token);

      if (response.message) return setIsAuthuticate(false);

      const { user } = response;

      dispatch(loginUser(user));
    })();
  }, [dispatch, loginUser, setIsAuthuticate]);
}
