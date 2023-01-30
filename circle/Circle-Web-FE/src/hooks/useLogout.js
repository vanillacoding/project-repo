import { useNavigate } from "react-router-dom";

import { logOut } from "../api/authApi";

export default function useLogOut() {
  const navigate = useNavigate();

  return async (event) => {
    try {
      event.preventDefault();

      await logOut();

      navigate("/", { replace: true });
    } catch (error) {
      navigate("/error");
    }
  };
}
