import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getMailList } from "../reducers/mailSlice";

function useMailbox(isLoggedInUser) {
  const dispatch = useDispatch();
  const [mailboxId, setMailboxId] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  const memoHandleClickMailbox = useCallback((id) => {
    setMailboxId(id);
    setIsToggled((prev) => !prev);
  });

  useEffect(() => {
    if (!isLoggedInUser) return;

    dispatch(getMailList());
  }, [isLoggedInUser]);

  function toggle() {
    setIsToggled((prev) => !prev);
  }

  return {
    mailboxId,
    isToggled,
    toggle,
    memoHandleClickMailbox,
  };
}

export default useMailbox;
