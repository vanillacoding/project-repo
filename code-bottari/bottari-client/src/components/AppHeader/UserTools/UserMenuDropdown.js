import { useState } from "react/cjs/react.development";
import { useHistory } from "react-router";
import styled from "styled-components";

import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";

import firebaseAPI from "../../../api/firebase";
import { logout } from "../../../api/service";

import { LIST } from "../../../constants/variants";
import { OK } from "../../../constants/messages";

const DropdownWrapper = styled.div`
  position: absolute;
  top: 80px;
  right: 15px;
  z-index: 100;
`;

export default function UserMenuDropdown({ onClick }) {
  const [idOpened, setIsOpened] = useState(true);

  const history = useHistory();

  const handleLoginStatus = () => {
    onClick(false);
  };

  const handleUserMenuButton = async (buttonName) => {
    if (buttonName === "New Snippet") {
      history.push("/snippets/new");

      setIsOpened(false);
    }

    if (buttonName === "My page") {
      const userId = localStorage.getItem("userId");

      history.push(`/users/${userId}`);

      setIsOpened(false);
    }

    if (buttonName === "Logout") {
      const { result } = await logout();

      if (result === OK) {
        await firebaseAPI.logout();

        localStorage.removeItem("userId");

        handleLoginStatus();

        setIsOpened(false);
        history.push("/");
      }
    }
  };

  const userMenuList = ["New Snippet", "My page", "Logout"].map((text) => (
    <Button
      variant="userMenu"
      onClick={() => handleUserMenuButton(text)}
      key={text}
    >
      {text}
    </Button >
  ));

  return (
    <DropdownWrapper>
      {idOpened && (
        <Dropdown variant={LIST} children={userMenuList} />
      )}
    </DropdownWrapper>
  );
}
