import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import useToken from "./useToken";

export default function useLogout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { deleteToken } = useToken();

  function logout() {
    dispatch({ type: "LOGOUT" });
    deleteToken("");
    history.push("/");
  }

  return logout;
}
