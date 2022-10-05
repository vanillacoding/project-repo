import { useCallback } from "react";
import { useDispatch } from "react-redux";

import actionCreator from "../actions/actionCreator";

/**
 *
 * @param {object} authService
 * @param {func} showErrorMessage
 * @returns {func} login handler
 */
const useSocialLogin = (authService, showErrorMessage) => {
  const dispatch = useDispatch();

  const handleSocialLogin = useCallback(
    async (event) => {
      try {
        const loginData = await authService.login(event.target.name);
        const data = {
          email: loginData.user.email,
          name: loginData.user.displayName,
        };

        dispatch(actionCreator.socialLoginAction(data));
      } catch (err) {
        showErrorMessage("로그인에 실패하였습니다.");
      }
    },
    [authService, dispatch, showErrorMessage]
  );

  return handleSocialLogin;
};

export default useSocialLogin;
