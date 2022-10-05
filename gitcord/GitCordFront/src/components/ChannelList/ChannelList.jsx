import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaBook } from "react-icons/fa";
import { ImEnter } from "react-icons/im";
import styled from "styled-components";
import { v1 as uuidv1 } from "uuid";

import { loginUser } from "../../actions/userActions";
import { socket } from "../../config/socketConfig";
import {
  INIT_ROOM_LIST,
  CREATE_ROOM
} from "../../constants/socketEvents";
import {
  NEED_TITLE,
  NEED_ROOM_ADDRESS,
  NOT_EXIST_ROOM,
  TOKEN_EXPIRED
} from "../../constants/message";
import route from "../../constants/routes";

import useAuth from "../customHooks/useAuth";
import useInitSocket from "../customHooks/useInitSocket";
import useLoading from "../customHooks/useLoading";

import Loading from "../Loading/Loading";
import Background from "../publicComponents/Backgroud/Background";
import AlertModal from "../publicComponents/AlertModal/AlertModal";
import WelcomeHeader from "../publicComponents/WelcomeHeader/WelcomeHeader";
import InputWithLabel from "../publicComponents/InputWithLabel/InputWithLabel";
import ChannelListGuide from "../ChannelList/ChannelListGuide/ChannelListGuide";
import ChannelListContainer from "./ChannelListContainer/ChannelListContainer";

const ChannelListOutter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .channel-enterroominput {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    height: 15%;

    .shadow-icon {
      border-radius: 20%;
      transition: all .5s ease;
      cursor: pointer;

      &:hover {
        color: #ffffff;
        background: rgba(52, 31, 151, 0.6);
        box-shadow: 0px 0px 0px 5px rgba(52, 31, 151, 0.6);
      }
    }

    .enter-icon {
      margin-top: 1.5em;
      cursor: pointer;
    }

    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60%;
      cursor: pointer;
    }
  }

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

function ChannelList() {
  const [roomId, setRoomId] = useState("");
  const [enterRoomId, setEnterRoomId] = useState("");
  const [createRoomTitle, setCreateRoomTitle] = useState("");
  const [modalMessages, setModalMessages] = useState([]);
  const [isAuthuticate, setIsAuthuticate] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isShowGuide, setIsShowGuide] = useState(false);
  const currentUser = useSelector((state) => state.userReducer.user);
  const { activedRooms } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();

  useAuth(dispatch, loginUser, setIsAuthuticate);
  useInitSocket(dispatch);
  useLoading(currentUser, setIsReady, isReady);

  useEffect(() => {
    socket.emit(INIT_ROOM_LIST);
  }, []);

  const handleCreateRoomChange = useCallback((event) => {
    setCreateRoomTitle(event.target.value);
  }, []);

  const handleEnterRoomIdChange = useCallback((event) => {
    setEnterRoomId(event.target.value);
  }, []);

  const handleCreateRoomClick = useCallback(() => {
    if (!createRoomTitle) {
      const alertMessage = NEED_TITLE;

      return setModalMessages([...modalMessages, alertMessage]);
    }

    const id = uuidv1();
    const roomInfo = {
      title: createRoomTitle,
      roomId: id
    };

    setRoomId(id);
    socket.emit(CREATE_ROOM, currentUser, roomInfo);
  }, [createRoomTitle, modalMessages, currentUser]);

  const handleEnterRoomClick = useCallback(() => {
    if (!enterRoomId) {
      const alertMessage = NEED_ROOM_ADDRESS;

      return setModalMessages([...modalMessages, alertMessage]);
    }

    const isExistRoom = activedRooms.some((activedRoom) => {
      return activedRoom[0] === enterRoomId;
    });

    if (!isExistRoom) {
      const alertMessage = NOT_EXIST_ROOM;

      return setModalMessages([...modalMessages, alertMessage]);
    }

    setRoomId(enterRoomId);
  }, [activedRooms, enterRoomId, modalMessages]);

  const handleGuideClick = useCallback(() => {
    setIsShowGuide((isShowGuide) => !isShowGuide);
  }, []);

  if (!isAuthuticate) return (
    <Redirect
      to={{
        pathname: route.ERROR,
        state: { message: TOKEN_EXPIRED }
      }}
    />
  );

  if (roomId) return (
    <Redirect
      to={{
        pathname: `${route.MAIN}/${roomId}`,
        state: { authRouting: true }
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
      <ChannelListOutter>
        <WelcomeHeader currentUser={currentUser} />
        <article className="channel-enterroominput">
          <InputWithLabel
            width="40%"
            height="60%"
            labelContent="Enter room"
            placeholder="room Id"
            onChange={handleEnterRoomIdChange}
            value={enterRoomId}
            type="text"
          />
          <ImEnter
            size={40}
            onClick={handleEnterRoomClick}
            className="enter-icon shadow-icon"
          />
          <InputWithLabel
            width="40%"
            height="60%"
            labelContent="Create room"
            placeholder="room title"
            onChange={handleCreateRoomChange}
            value={createRoomTitle}
            type="text"
          />
          <ImEnter
            size={40}
            onClick={handleCreateRoomClick}
            className="enter-icon shadow-icon"
          />
        </article>
        <ChannelListContainer activedRooms={activedRooms} />
        {
          0 < modalMessages.length &&
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
        { isShowGuide && <ChannelListGuide /> }
      </ChannelListOutter>
    </Background>
  );
}

export default ChannelList;
