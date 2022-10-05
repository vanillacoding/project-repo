import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import actionCreator from "../actions/actionCreator";

/**
 *
 * @param {object} authService
 * @returns login handler
 */
const useLocalLogin = (authService) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = useCallback(async () => {
    await authService.logout();
    await dispatch(actionCreator.logoutAction(history));
    history.push("/");
  }, [authService, dispatch, history]);

  return handleLogout;
};

export default useLocalLogin;
