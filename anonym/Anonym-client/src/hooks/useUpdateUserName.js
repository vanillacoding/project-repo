import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserName } from "../actions/userActionCreator";

const useUpdateUserName = (userName) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [newName, setNewName] = useState(userName);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      dispatch(updateUserName(newName));
      setIsUpdate(false);
    }
  }, [isUpdate, dispatch, newName]);

  return {
    newName,
    updateNewName: setNewName,
    isUpdateUserName: setIsUpdate,
  };
};

export default useUpdateUserName;
