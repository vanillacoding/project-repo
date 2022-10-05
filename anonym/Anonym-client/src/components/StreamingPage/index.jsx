import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import Streamer from "./Streamer";
import Viewer from "./Viewer";
import { joinRoom, leaveRoom } from "../../api/socket";

function StreamingPage() {
  const { _id: userId } = useSelector((state) => state.auth.userInfo);
  const { id } = useParams();

  useEffect(() => {
    joinRoom(id);

    return () => {
      leaveRoom(id);
    };
  }, [id]);

  return (
    <div className="content-wrapper">
      <div className="streaming-container">
        <div className="main-container">
          {userId === id ? <Streamer /> : <Viewer />}
        </div>
        <ChatBox />
      </div>
    </div>
  );
}

export default StreamingPage;
