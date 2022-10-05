import React, { ReactNode, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import { useAppSelector } from "../../app/store";

interface Props {
  children: ReactNode;
  exact?: boolean;
  path: string;
}

function AuthRoute({ children, exact, path }: Props) {
  const isLogin = useAppSelector((state) => state.auth.isLogIn);

  const history = useHistory();

  useEffect(() => {
    if (isLogin !== null && !isLogin) {
      history.push("/");
    }
  }, [isLogin]);

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

AuthRoute.defaultProps = {
  exact: false,
};

export default AuthRoute;
