import { useCallback } from "react";
import { useDispatch } from "react-redux";

import actionCreator from "../actions/actionCreator";
import validateInput from "../utils/validateInput";

/**
 *
 * @param {object} signupData
 * @param {func} showErrorMessage
 * @returns {func} sign up handler
 */
const useSignUp = (signupData, showErrorMessage) => {
  const dispatch = useDispatch();

  const handleSignup = useCallback(
    (event) => {
      event.preventDefault();

      const validationResult = validateInput(signupData);

      if (validationResult) {
        return showErrorMessage(validationResult);
      }

      dispatch(actionCreator.signupAction(signupData));
    },

    [dispatch, signupData, showErrorMessage]
  );

  return handleSignup;
};

export default useSignUp;
