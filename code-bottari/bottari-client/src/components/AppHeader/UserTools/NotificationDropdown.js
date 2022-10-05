import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";

import {
  LIKE_ICON,
  COMMENT_ICON,
  NEW_SNIPPET_ICON,
  FOLLOWER_ICON,
} from "../../../constants/images";

import {
  clickNotification,
  getNotificationList
} from "../../../api/service";

import {
  LIST,
  NOTIFICATION
} from "../../../constants/variants";

const Message = styled.div`
  display: inline-block;
  margin: 0px 0px 0px 5px;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 80px;
  right: 15px;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

const NotificationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Checking = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 15px;
  padding: 5px 7px;
  text-align: center;
  color: black;
  font-size: 10px;
  cursor: pointer;
  z-index: 200;

  &:hover {
    transition: 0.2s;
    color: purple;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 10px;
`;

const selectPath = (type, targetPath) => {
  const pathTypes = {
    like: `/snippets/${targetPath}`,
    comment: `/snippets/${targetPath}`,
    snippet: `/snippets/${targetPath}`,
    follower: `/users/${targetPath}`,
  };

  return pathTypes[type];
};

const selectIcon = (type) => {
  const iconTypes = {
    like: LIKE_ICON,
    comment: COMMENT_ICON,
    snippet: NEW_SNIPPET_ICON,
    follower: FOLLOWER_ICON,
  };

  return iconTypes[type];
};

const selectAlternative = (type) => {
  const alternativeTypes = {
    like: "좋아요 아이콘",
    comment: "댓글 아이콘",
    snippet: "스니펫 아이콘",
    follower: "팔로우 아이콘",
  };

  return alternativeTypes[type];
};

const selectMessage = (type, user) => {
  const messageTypes = {
    like: `${user.nickname}님께서 회원님의 스니펫을 좋아합니다.`,
    comment: `${user.nickname}님께서 회원님의 스니펫에 댓글을 남겼습니다.`,
    snippet: `${user.nickname}님께서 새 스니펫을 업로드하셨습니다.`,
    follower: `${user.nickname}님께서 회원님을 팔로우하셨습니다.`,
  };

  return messageTypes[type];
};

export default function NotificationDropdown({ notificationList, onClick }) {
  const history = useHistory();
  const queryClient = useQueryClient();
  const hasNotification = !!notificationList.length;

  const { mutate } = useMutation(getNotificationList, {
    onSettled: async (data) => {
      queryClient.setQueryData("notificationList", data);
    },
  });

  const closeDropdown = (event) => {
    onClick(event);
  };

  const handleNotificationButtonClick = async (event, id, path) => {
    try {
      await makeAsRead(id);

    } catch (error) {
      alert(error);
    }

    closeDropdown(event);
    history.push(path);
  };

  const makeAsRead = async (id) => {
    await clickNotification(id);

    mutate();
  };

  return (
    <DropdownWrapper>
      <Dropdown
        variant={LIST}
        children={hasNotification
          ? notificationList.map(({ type, user, targetId: targetPath, _id: notificationId }) => {
            const path = selectPath(type, targetPath);

            return (
              <ButtonWrapper key={notificationId}>
                <Button
                  variant={NOTIFICATION}
                  onClick={(event) => handleNotificationButtonClick(event, notificationId, path)}
                  children={
                    <NotificationWrapper>
                      <Icon src={selectIcon(type)} alt={selectAlternative(type)} />
                      <Message>
                        {selectMessage(type, user, targetPath)}
                      </Message>
                    </NotificationWrapper>
                  }
                />
                <Checking onClick={() => makeAsRead(notificationId)}>읽음</Checking>
              </ButtonWrapper>
            );
          })
          : <Button variant={NOTIFICATION} children="읽지 않은 알림이 없습니다." />
        }
      />
      <CloseButton onClick={closeDropdown}>
        ✕
      </CloseButton>
    </DropdownWrapper>
  );
}
