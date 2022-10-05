import React, {
  useCallback,
  useEffect,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { FaBook } from "react-icons/fa";
import styled from "styled-components";

import { socket } from "../../config/socketConfig";
import { leaveRoom } from "../../actions/roomActions";
import { loginUser } from "../../actions/userActions";
import { JOIN, BYE } from "../../constants/socketEvents";
import {
  COPY_CLIPBOARD,
  UNUSUAL_ACCESS,
  TOKEN_EXPIRED
} from "../../constants/message";
import route from "../../constants/routes";

import useAuth from "../customHooks/useAuth";
import useInitSocket from "../customHooks/useInitSocket";
import useLoading from "../customHooks/useLoading";

import MainNavbar from "./MainNavbar/MainNavbar";
import UserList from "./UserList/UserList";
import CodeEditor from "./CodeEditor/CodeEditor";
import WhiteBoard from "./WhiteBoard/WhiteBoard";
import Chat from "./Chat/Chat";
import CamWindow from "./CamWindow/CamWindow";
import Background from "../publicComponents/Backgroud/Background";
import ModalBackground from "../publicComponents/ModalBackground/ModalBackground";
import Loading from "../Loading/Loading";
import AlertModal from "../publicComponents/AlertModal/AlertModal";
import MainGuide from "./MainGuide/MainGuide";
import LeaveRoomAlertModal from "./LeaveRoomAlertModal/LeaveRoomAlertModal";

const MainOuter = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;

  .guide {
    position: fixed;
    right: 1em;
    bottom: 1em;
    color: #ffffff;
    z-index: 11;
    transition: all .5s ease;
    cursor: pointer;

    &:hover {
      background: rgba(72, 219, 251, 0.6);
      border-radius: 3px;
      box-shadow: 0px 0px 0px 5px rgba(72, 219, 251, 0.6);
    }
  }
`;

function Main({ location }) {
  const [isAuthuticate, setIsAuthuticate] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [modalMessages, setModalMessages] = useState([]);
  const [toggleMainBoard, setToggleMainBoard] = useState(false);
  const [isShowGuide, setIsShowGuide] = useState(false);
  const [isVideoStopped, setIsVideoStopped] = useState(false);
  const {
    title,
    participants,
    contents,
    chatLogs,
    typingUsers,
    isOwnerClosed
  } = useSelector((state) => state.roomReducer);
  const currentUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const authRouting = location.state && location.state.authRouting;

  useAuth(dispatch, loginUser, setIsAuthuticate);
  useInitSocket(dispatch);
  useLoading(currentUser, setIsReady);

  useEffect(() => {
    socket.emit(JOIN, currentUser, roomId, true);

    window && window.addEventListener("keydown", (event) => {
      if (event.key === "F5") {
        event.preventDefault();
        event.returnValue = false;

        return false;
      }
    });

    return () => {
      socket.emit(BYE, currentUser, roomId);
      dispatch(leaveRoom());
    };
  }, []);

  const handleCopyButtonClick = useCallback(() => {
    const alertMessage = COPY_CLIPBOARD;

    setModalMessages([...modalMessages, alertMessage]);
  }, [modalMessages]);

  const handleToggleButtonClick = useCallback(() => {
    setToggleMainBoard((beforeState) => !beforeState);
  }, []);

  const handleGuideClick = useCallback(() => {
    setIsShowGuide((isShowGuide) => !isShowGuide);
  }, []);

  if (!authRouting) return (
    <Redirect
      to={{
        pathname: route.ERROR,
        state: { message: UNUSUAL_ACCESS }
      }}
    />
  );

  if (!isAuthuticate) return (
    <Redirect
      to={{
        pathname: route.ERROR,
        state: { message: TOKEN_EXPIRED }
      }}
    />
  );

  if (!isReady) return (
    <Background>
      <Loading />
    </Background>
  );

  return (
    <Background>
      <MainOuter>
        <MainNavbar
          currentUser={currentUser}
          roomTitle={title}
          roomId={roomId}
          handleCopyButtonClick={handleCopyButtonClick}
          onToggleClick={handleToggleButtonClick}
        />
        <MainContainer>
          <UserList
            currentUser={currentUser}
            userList={participants}
            alertMessages={modalMessages}
            setAlertMessages={setModalMessages}
            roomId={roomId}
            socket={socket}
            isVideoStopped={isVideoStopped}
            videoToggle={setIsVideoStopped}
          />
          {
            toggleMainBoard
              ? <WhiteBoard
                  socket={socket}
                  roomId={roomId}
                />
              : <CodeEditor
                  currentUser={currentUser}
                  typingUsers={typingUsers}
                  socket={socket}
                  roomId={roomId}
                  contents={contents}
                />
          }
          <Chat
            currentUser={currentUser}
            chatLogs={chatLogs}
            roomId={roomId}
            socket={socket}
          />
          <CamWindow
            currentUser={currentUser}
            participants={participants}
            socket={socket}
            roomId={roomId}
            isVideoStopped={isVideoStopped}
          />
          {
            (modalMessages.length > 0) &&
              <AlertModal
                handleAlertDelete={setModalMessages}
                alertMessages={modalMessages}
              />
          }
          <FaBook
            size={40}
            className="guide"
            onClick={handleGuideClick}
          />
          { isShowGuide && <MainGuide /> }
          {
            isOwnerClosed &&
              <ModalBackground>
                <LeaveRoomAlertModal />
              </ModalBackground>
          }
        </MainContainer>
      </MainOuter>
    </Background>
  );
}

export default Main;
