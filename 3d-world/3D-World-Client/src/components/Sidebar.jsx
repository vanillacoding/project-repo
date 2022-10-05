import React from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";

export default function Sidebar() {
  const userError = useSelector((state) => state.user.error);
  const roomError = useSelector((state) => state.room.error);
  const mailError = useSelector((state) => state.mail.error);
  const hasError = userError || roomError || mailError;

  return (
    <>
      {hasError && (
        <Notification>
          {userError ?? ""}
          {roomError ?? ""}
          {mailError ?? ""}
        </Notification>
      )}
    </>
  );
}
