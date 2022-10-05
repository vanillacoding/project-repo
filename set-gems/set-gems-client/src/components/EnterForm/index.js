import React from "react";
import PropTypes from "prop-types";

import "./EnterForm.css";

function EnterForm({ onSubmit }) {
  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    const roomName = ev.target.roomName.value;
    const nickname = ev.target.nickname.value;
    const isMuted = ev.target.mute.checked;
    const isVideoOff = ev.target.videoOff.checked;

    onSubmit({ roomName, nickname, isMuted, isVideoOff });
  };

  return (
    <div className="form-wrapper">
      <h2>방 입장</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="roomName">방 제목</label>
          <input name="roomName" type="text" required/>
        </div>
        <div>
          <label htmlFor="nickname">닉네임 </label>
          <input name="nickname" placeholder="anonymous" type="text"/>
        </div>
        <div>
          <label htmlFor="mute">내 소리 끄기</label>
          <input type="checkbox" name="mute" />
          <label htmlFor="videoOff">내 화면 끄기</label>
          <input type="checkbox" name="videoOff" />
        </div>
        <button>Enter</button>
      </form>
    </div>
  );
}

EnterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default EnterForm;
