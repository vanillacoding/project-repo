import { useRef, useState } from "react";
import styled from "styled-components";

import Button from "../common/Button";
import ProfileImage from "../../components/RegisterPage/RegisterCard/ProfileImage";

import { modifyUserData } from "../../api/service";
import validateNickname from "../../utils/validateNickname";
import addPhoto from "../../api/s3";

import {
  FAILED_UPLOAD_IMAGE,
  USER_INFORMATION_UPDATED,
  OK,
} from "../../constants/messages";

import {
  MONOKAI,
  XCODE,
  DRACULA,
  ECLIPSE,
  TOMORROW,
  GITHUB,
  SOLARIZED_DARK,
  SOLARIZED_LIGHT,
  TERMINAL,
} from "../../constants/themes";

import { EDIT } from "../../constants/variants";

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 430px;
  height: 100%;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
`;

const FixedWrapper = styled.div`
  position: fixed;
`;

const BlankBlock = styled.div`
  width: 430px;
  height: 60px;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 430px;
  height: 230px;
  margin: 50px 0;
  text-align: center;
`;

const NickName = styled.div`
  font-weight: bold;
  font-size: 35px;
`;

const EditButton = styled.button`
  width: 90px;
  margin: 10px auto;
  border: 1px solid var(--color-message);
  border-radius: 5px;
  font-size: 15px;
  color: var(--color-message);
  cursor: pointer;
`;

const Input = styled.input`
  display: block;
  width: 230px;
  height: 30px;
  padding-left: 10px;
  margin-left: 90px;
  border: 2px solid var(--color-message);
  border-radius: 4px;
  outline: none;
  transition: 0.2s;

  &:focus {
    border: 2px solid var(--color-mint-focus);
  }

  &::placeholder {
    font-size: 14px;
  }
`;

const Email = styled.div`
  font-size: 25px;
`;

const FollowerNumber = styled.div`
  font-size: 25px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 250px;
  margin-left: 85px;
`;

const Message = styled.p`
  font-size: 12px;
  color: var(--color-message);
`;

const Label = styled.label`
  margin-top: 30px;
  font-size: 15px;
  color: gray;
`;

const Select = styled.select`
  display: block;
  height: 30px;
  margin: 10px auto;
  border: 2px solid var(--color-message);
  border-radius: 4px;
`;

export default function UserTab({ user, changeUserImage, changeNickname, changedNickname }) {
  const { _id: userId, email, nickname, imageUrl, followerList, theme: currentTheme } = user;

  const [failureReason, setFailureReason] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(imageUrl);
  const nicknameRef = useRef();
  const themeRef = useRef();

  const loggedInId = localStorage.getItem("userId");
  const canEdit = loggedInId === userId;

  const themes = [MONOKAI, XCODE, DRACULA, ECLIPSE, TOMORROW, GITHUB, SOLARIZED_DARK, SOLARIZED_LIGHT, TERMINAL];

  let data;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFailureReason("");
    setProfileImage(imageUrl);
  };

  const handleSubmitClick = async () => {
    const nickname = nicknameRef.current.value;
    const isDifferentTheme = currentTheme !== themeRef.current.value;
    const theme = isDifferentTheme ? themeRef.current.value : undefined;

    const validationResult = validateNickname(nickname);

    if (validationResult !== OK) {
      setFailureReason(validationResult);

      return;
    }

    setFailureReason("");

    const resource = typeof data === "string"
      ? { nickname, theme }
      : { nickname, theme, imageUrl: profileImage };

    const response = await modifyUserData(user._id, resource);

    if (response.result === OK) {
      alert(USER_INFORMATION_UPDATED);

      setIsEditing(false);
      changeUserImage(profileImage);
      changeNickname(nickname);
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
    <Wrapper>
      <FixedWrapper>
        <BlankBlock />
        <ProfileImage imageUrl={profileImage} canSelectImage={isEditing} changeImage={changeProfileImage} />
        <Information>
          <NickName>{changedNickname || nickname}</NickName>
          {(canEdit && !isEditing) && <EditButton onClick={handleEditClick}>내 정보 수정</EditButton>}
          {isEditing &&
            <>
              <Input type="text" placeholder="수정할 닉네임을 입력해 주세요." ref={nicknameRef} />
              <Label>
                수정할 테마를 선택해 주세요.
                <Select
                  ref={themeRef}
                >
                  <option defaultValue={currentTheme}>{currentTheme}</option>
                  {themes
                    .filter((newTheme) => newTheme !== currentTheme)
                    .map((theme) => (
                      <option key={theme}>{theme}</option>
                    ))
                  }
                </Select>
              </Label>
            </>
          }
          <Message>{failureReason}</Message>
          {!isEditing &&
            <>
              <Email>{email}</Email>
              <FollowerNumber>구독자 수 : {followerList?.length}</FollowerNumber>
            </>
          }
        </Information>
        <ButtonWrapper>
          {isEditing &&
            <>
              <Button variant={EDIT} children="수정하기" onClick={handleSubmitClick} />
              <Button variant={EDIT} children="수정취소" onClick={handleCancelClick} />
            </>
          }
        </ButtonWrapper>
      </FixedWrapper>
    </Wrapper>
  );
}
