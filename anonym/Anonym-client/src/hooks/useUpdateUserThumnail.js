import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserThumnail } from "../actions/userActionCreator";

const useUpdateUserThumnail = () => {
  const [newThumnail, setNewThumnail] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      const reader = new FileReader();

      reader.readAsDataURL(imageInputRef.current.files[0]);
      reader.onload = (e) => {
        dispatch(updateUserThumnail(e.target.result));
        setIsUpdate(false);
      };
    }
  }, [isUpdate, dispatch, imageInputRef]);

  return {
    newThumnail,
    updateNewThumnail: setNewThumnail,
    imageInputRef,
    isUpdateUserThumnail: setIsUpdate,
  };
};

export default useUpdateUserThumnail;
