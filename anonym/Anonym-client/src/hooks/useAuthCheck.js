import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { checkAuthorization } from "../actions/authActionCreators";
import Cookies from "universal-cookie";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("jwt");

    dispatch(checkAuthorization());

    if (token) {
      history.push("/");
    } else {
      history.push("/auth/login");
    }
  }, [dispatch, history]);
};

export default useAuthCheck;
