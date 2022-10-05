import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../actions/authActionCreators";

const useLogout = () => {
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogout) {
      dispatch(userLogout());
    }
  }, [isLogout, dispatch]);

  return setIsLogout;
};

export default useLogout;
