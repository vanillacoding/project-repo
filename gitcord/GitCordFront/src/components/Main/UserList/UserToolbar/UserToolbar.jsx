import React, { useCallback, useState } from "react";
import { AiFillSave } from "react-icons/ai";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { RiFileList3Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { VIDEO_TOGGLE } from "../../../../constants/socketEvents";

import SavingToolbar from "./SavingToolbar/SavingToolbar";
import DocumentList from "./DocumentList/DocumentList";

const UserToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 10%;
  background-color: #FFEEF4;
  bottom: 0;
  border-radius: 10px;
  font-weight: bold;

  .toolbar-icon {
    margin: 10px;
    border-radius: 50%;
    transition: all .5s ease;
    cursor: pointer;

    &:hover {
      color: #ffffff;
      background: rgba(52, 31, 151, 0.6);
      box-shadow: 0px 0px 0px 5px rgba(52, 31, 151, 0.6);
    }
  }
`;

function UserToolbar({
  user,
  alertMessages,
  setAlertMessages,
  socket,
  roomId,
  isVideoStopped,
  videoToggle
}) {
  const [isShowSavingToolbar, setIsShowSavingToolbar] = useState(false);
  const [isShowDocumentList, setIsShowDocumentList] = useState(false);
  const { contents } = useSelector((state) => state.roomReducer);

  const handleSaveButtonClick = useCallback(() => {
    setIsShowDocumentList(false);
    setIsShowSavingToolbar((isShowSavingToolbar) => !isShowSavingToolbar);
  }, []);

  const handleDocumentListButtonClick = useCallback(() => {
    setIsShowSavingToolbar(false);
    setIsShowDocumentList((isShowDocumentList) => !isShowDocumentList);
  }, []);

  const handleVideoToggleButtonClick = useCallback(() => {
    socket.emit(VIDEO_TOGGLE, roomId, user);
    videoToggle(isVideoStopped => !isVideoStopped);
  }, [roomId, user]);

  return (
    <UserToolbarContainer>
      {user.name}
      <article>
        {
          isVideoStopped
            ? <BsFillMicMuteFill
                size={25}
                className="toolbar-icon"
                onClick={handleVideoToggleButtonClick}
              />
            : <BsFillMicFill
                size={25}
                className="toolbar-icon"
                onClick={handleVideoToggleButtonClick}
              />
        }
        <RiFileList3Fill
          size={25}
          className="toolbar-icon"
          onClick={handleDocumentListButtonClick}
        />
        <AiFillSave
          size={25}
          className="toolbar-icon"
          onClick={handleSaveButtonClick}
        />
      </article>
      {
        (isShowSavingToolbar && !isShowDocumentList) &&
          <SavingToolbar
            alertMessages={alertMessages}
            setAlertMessages={setAlertMessages}
            contents={contents}
            user={user}
            hideToolbar={handleSaveButtonClick}
          />
      }
      {
        (isShowDocumentList && !isShowSavingToolbar) &&
          <DocumentList
            alertMessages={alertMessages}
            setAlertMessages={setAlertMessages}
            user={user}
            socket={socket}
            roomId={roomId}
            hideDocumentList={handleDocumentListButtonClick}
          />
      }
    </UserToolbarContainer>
  );
}

UserToolbar.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  alertMessages: PropTypes.array.isRequired,
  setAlertMessages: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  isVideoStopped: PropTypes.bool.isRequired,
  videoToggle: PropTypes.func.isRequired
};

export default React.memo(UserToolbar);
