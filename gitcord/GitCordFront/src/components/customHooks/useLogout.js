import { useCallback } from "react";

import { logoutUser } from "../../actions/userActions";

export default function useLogout(dispatch, setIsLogout) {
  return useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    dispatch(logoutUser());
    setIsLogout(true);
  }, [dispatch]);
}
