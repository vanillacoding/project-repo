import React from "react";

import { useAppSelector } from "../../app/store";
import Button from "../common/Button";

import useGoogleAuth from "../../utils/hooks/useGoogleAuth";

function GoogleAuth() {
  const isLogIn = useAppSelector((state) => state.auth.isLogIn);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const { googleSignIn, googleSignOut } = useGoogleAuth();

  return (
    <div>
      {!isLoading && (
        <Button
          color={isLogIn ? "pink" : "blue"}
          size="medium"
          fullWidth
          boxShadow
          onClick={isLogIn ? googleSignOut : googleSignIn}
        >
          {isLogIn ? "Log Out" : "Log In With Google"}
        </Button>
      )}
    </div>
  );
}

export default GoogleAuth;
