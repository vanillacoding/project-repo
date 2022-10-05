import React, { useState, useEffect } from "react";
import Confirm from "./Confirm";
import { verifyAPI } from "../../api";

export default function ConfirmContainer({
  match: {
    params: { token },
  },
}) {
  const [isPending, setIsPending] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function verifyUser() {
      const response = await verifyAPI(token);
      const { result } = await response.json();

      setIsPending(false);

      if (result === "ok") {
        setMessage("인증되었습니다.");
      } else {
        setMessage("잘못된 토큰 혹은 서버 장애입니다.");
      }
    }
    verifyUser();
  }, [token]);

  return <Confirm isPending={isPending} message={message} />;
}
