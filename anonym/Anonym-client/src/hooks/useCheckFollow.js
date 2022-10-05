import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCheckFollow = (targetID) => {
  const { followings } = useSelector((state) => state.auth.userInfo);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    setIsFollow(followings.find((user) => user._id === targetID));
  }, [targetID, followings]);

  return isFollow;
};

export default useCheckFollow;
