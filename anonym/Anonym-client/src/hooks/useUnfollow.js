import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser } from "../actions/userActionCreator";

const useUnfollow = () => {
  const [targetID, setTargetID] = useState(null);
  const { _id: userID } = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (targetID && userID !== targetID) {
      dispatch(unfollowUser(userID, targetID));
      setTargetID(null);
    }
  }, [userID, targetID, dispatch]);

  return setTargetID;
};

export default useUnfollow;
