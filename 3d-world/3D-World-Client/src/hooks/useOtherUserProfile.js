import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import fetchData from "../utils/fetchData";
import { updateError } from "../reducers/roomSlice";

function useOtherUserProfile(id) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    photoURL: "",
    musicURL: "",
  });

  useEffect(() => {
    async function getUserProfile() {
      try {
        const user = await fetchData("GET", `/user/${id}`);

        setUserData({
          name: user.name,
          description: user.description,
          photoURL: user.photoURL,
          musicURL: user.musicURL,
        });
      } catch (err) {
        dispatch(updateError(err.message));
      }
    }

    getUserProfile();
  }, [id]);

  return {
    userData,
  };
}

export default useOtherUserProfile;
