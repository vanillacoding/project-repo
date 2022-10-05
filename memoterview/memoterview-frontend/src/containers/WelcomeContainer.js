import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { legos } from "../constants/legos";
import WelcomePage from "../pages/WelcomePage";
import { setUser } from "../redux/reducers/user";

export default function WelcomeContainer() {
  const dispatch = useDispatch();

  const [newUserInfo, setNewUserInfo] = useState({ email: "", name: "", avatar: "" });
  const { projectId, intervieweeId } = useParams();
  const history = useHistory();

  function getRandomLegoAvatar() {
    const randomIdx = Math.floor(Math.random() * 9);
    const randomPickLegoAvatar = legos[randomIdx];

    return setNewUserInfo({ ...newUserInfo, avatar: randomPickLegoAvatar });
  }

  useEffect(() => {
    getRandomLegoAvatar();
  }, []);

  function handleInputChange(event) {
    event.preventDefault();

    const { target: { value, name } } = event;

    setNewUserInfo({
      ...newUserInfo,
      [name]: value,
    });
  }

  function handleAskPermissionBtnClick(event) {
    event.preventDefault();

    dispatch(setUser({ 
      username: newUserInfo.name, 
      email: newUserInfo.email, 
      avatar: newUserInfo.avatar, 
      isInterviewee: true,
    }));

    history.push(`/interviewee/${projectId}/${intervieweeId}`);
  }

  return (
    <>
      <WelcomePage
        onInputChange={handleInputChange}
        onAskPermissionBtnClick={handleAskPermissionBtnClick}
      />
    </>
  );
}
