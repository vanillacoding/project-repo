import { useCallback } from "react";
import { useDispatch } from "react-redux";

import actionCreator from "../actions/actionCreator";
import validateInput from "../utils/validateInput";

/**
 *
 * @param {string} email
 * @param {string} password
 * @param {func} showErrorMessage
 * @returns login handler
 */
const useLocalLogin = (email, password, showErrorMessage) => {
  const dispatch = useDispatch();

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const inputData = {
        email,
        password,
      };

      const validationResult = validateInput(inputData);

      if (validationResult) {
        return showErrorMessage(validationResult);
      }

      dispatch(actionCreator.loginAction(inputData));
    },
    [dispatch, email, password, showErrorMessage]
  );

  return handleLogin;
};

export default useLocalLogin;
