import { useState } from "react";
import { useHistory } from "react-router";

import Button from "../../common/Button";

import firebaseAPI from "../../../api/firebase";
import { checkMember } from "../../../api/service";

import { BASIC } from "../../../constants/variants";

export default function LoginButton({ handleLoginStatus }) {
  const history = useHistory();

  const [idToken, setIdToken] = useState(null);

  if (idToken) {
    checkMember(idToken).then(({ userId }) => {
      if (userId) {
        localStorage.setItem("userId", userId);

        handleLoginStatus(true);

        history.push("/");

        return;
      }

      history.push("/users/register");
    });
  }

  const handleLogin = async () => {
    try {
      await firebaseAPI.login();

      const idToken = await firebaseAPI.getToken();

      setIdToken(idToken);
    } catch (error) {
      alert(error.message);

      return;
    }
  };

  return <Button variant={BASIC} onClick={handleLogin}>로그인</Button>;
}
