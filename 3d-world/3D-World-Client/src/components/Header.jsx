import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import DropDown from "./DropDown";
import MiniProfile from "./MiniProfile";
import StyledButton from "./shared/StyledButton";
import { userLogout, userSelector } from "../reducers/userSlice";
import useModal from "../hooks/useModal";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.5vh;
  padding: 1rem;
`;

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    _id,
    name,
    photoURL,
    friends,
  } = useSelector(userSelector);
  const { modalOpen, toggle, setModalOpen } = useModal();

  return (
    <Container>
      <MiniProfile
        photoURL={photoURL}
        name={name}
      />
      <DropDown
        name="친구 목록 👨‍👨‍👧‍👦"
        isOpen={modalOpen}
        toggle={toggle}
        onBlur={() => setModalOpen(false)}
      >
        {friends.map((friend) => (
          <Link
            key={friend._id}
            to={`/room/${friend._id}`}
            onClick={() => setModalOpen(false)}
          >
            <MiniProfile
              key={friend._id}
              photoURL={friend.photoURL}
              name={friend.name}
            />
          </Link>
        ))}
      </DropDown>
      <div>
        <StyledButton>
          <Link to="/world">
            월드
          </Link>
        </StyledButton>
        <StyledButton onClick={() => history.push(`/room/${_id}`)}>홈</StyledButton>
        <StyledButton onClick={() => dispatch(userLogout())}>로그아웃</StyledButton>
      </div>
    </Container>
  );
}

export default Header;
