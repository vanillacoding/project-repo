import { useRef, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import ProfileImage from "./ProfileImage";
import Nickname from "./Nickname";
import Button from "../../common/Button";

import validateNickname from "../../../utils/validateNickname";
import firebaseAPI from "../../../api/firebase";
import addPhoto from "../../../api/s3";

import { REGISTRATION } from "../../../constants/names";
import { BASIC } from "../../../constants/variants";
import { DEFAULT_IMAGE_URL } from "../../../constants/constants";

import {
  FAILED_UPLOAD_IMAGE,
  OK,
} from "../../../constants/messages";
import { registerUser } from "../../../api/service";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 430px;
  height: 500px;
  background: #F3F2F9;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
​
  .title {
    margin: 0px;
    text-align: center;
  }
`;

export default function RegisterCard() {
  const [failureReason, setFailureReason] = useState("");
  const [profileImage, setProfileImage] = useState(DEFAULT_IMAGE_URL);
  const referenceTarget = useRef();
  const history = useHistory();

  let data;

  const handleButtonClick = async () => {
    const nickname = referenceTarget.current.value;

    const validationResult = validateNickname(nickname);

    if (validationResult !== OK) {
      setFailureReason(validationResult);

      return;
    }

    const imageUrl = typeof data === "string" ? data : profileImage;
    const idToken = await firebaseAPI.getToken();
    const resource = { idToken, nickname, imageUrl };

    const response = await registerUser(idToken, resource);

    if (response === OK) {
      history.push("/");
    }
  };

  const changeProfileImage = async () => {
    data = await addPhoto();

    if (!data) {
      alert(FAILED_UPLOAD_IMAGE);

      return;
    }

    if (typeof data !== "string") {
      setProfileImage(data.Location);
    }
  };

  return (
    <Card>
      <ProfileImage changeImage={changeProfileImage} profileImage={profileImage} />
      <Nickname reference={referenceTarget} message={failureReason} />
      <Button variant={BASIC} onClick={handleButtonClick}>{REGISTRATION}</Button>
    </Card>
  );
}
