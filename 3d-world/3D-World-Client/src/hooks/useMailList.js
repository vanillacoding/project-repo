import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  mailSelector,
  getMailList,
  deleteMailList,
  deleteMailItem,
  readMailItem,
} from "../reducers/mailSlice";

function useMailList() {
  const dispatch = useDispatch();
  const mailList = useSelector(mailSelector);
  const [isDetail, setIsDetail] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    dispatch(getMailList());
  }, []);

  function handleClose() {
    setIsDetail((prev) => !prev);
  }

  async function handleSelectMail(mail) {
    if (mail.status === "NEW") {
      dispatch(readMailItem(mail._id));
    }

    setSelectedMail(mail);
    setIsDetail((prev) => !prev);
  }

  async function handleDeleteMailItem(mailId) {
    await dispatch(deleteMailItem(mailId));
    setIsDetail((prev) => !prev);
  }

  function handleDeleteMailList() {
    dispatch(deleteMailList());
  }

  return {
    mailList,
    isDetail,
    selectedMail,
    handleClose,
    handleSelectMail,
    handleDeleteMailItem,
    handleDeleteMailList,
  };
}

export default useMailList;
