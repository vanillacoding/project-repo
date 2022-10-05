import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../actions/userActionCreator";

const useFollow = () => {
  const [targetID, setTargetID] = useState(null);
  const { _id: userID } = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (targetID && userID !== targetID) {
      dispatch(followUser(userID, targetID));
      setTargetID(null);
    }
  }, [userID, targetID, dispatch]);

  return setTargetID;
};

export default useFollow;
