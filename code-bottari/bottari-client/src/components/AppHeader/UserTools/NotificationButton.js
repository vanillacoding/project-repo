import { useState } from "react";
import { useQuery } from "react-query";

import Button from "../../common/Button";

import NotificationDropdown from "./NotificationDropdown";

import { ICON } from "../../../constants/variants";

import {
  ON_NOTIFICATION_ICON,
  OFF_NOTIFICATION_ICON,
} from "../../../constants/images";

import { getNotificationList } from "../../../api/service";

export default function NotificationButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleDropdown = () => setIsClicked(!isClicked);

  const { isLoading, data } = useQuery("notificationList", async () => await getNotificationList());

  if (isLoading) {
    return <></>;
  }

  if (data.status === 401) {
    localStorage.removeItem("userId");
    window.location.replace("/");

    return;
  }

  const filteredNotificationList = data.notificationList.filter((notification) => notification.isChecked === false);
  const hasNotification = !!filteredNotificationList.length;

  const notificationIcon = hasNotification ? ON_NOTIFICATION_ICON : OFF_NOTIFICATION_ICON;

  return (
    <>
      <Button
        variant={ICON}
        onClick={handleDropdown}
        children={(
          <img
            src={notificationIcon}
            alt="알림 버튼"
            width="40px"
            height="35px"
          />
        )}
      />
      {isClicked && (
        <NotificationDropdown
          notificationList={filteredNotificationList}
          onClick={handleDropdown}
        />)}
    </>
  );
}
