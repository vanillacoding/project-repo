import { Redirect, Route } from "react-router-dom";

import useToken from "../../hooks/useToken";

export default function AuthRoute({ children, ...rest }) {
  const { token } = useToken(); // 이부분 로직 app container로 빼주기

  return (
    <Route
      {...rest}
    >
      {token ? children : <Redirect to={{ pathname: "/", state: { from: rest.path } }} />}
    </Route>
  );
};
