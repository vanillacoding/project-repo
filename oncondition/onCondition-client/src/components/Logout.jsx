import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useGapi } from "../helpers/useGapi";
import Button from "./Button";
import { logout } from "../features/userSlice";

function Logout() {
  const dispatch = useDispatch();
  const [gapi, isLoaded] = useGapi();

  const handleLogout = function () {
    const auth2 = gapi.auth2.getAuthInstance();

    if (auth2) {
      auth2.signOut();
      dispatch(logout());
    }
  };

  return (
    <div className="button-wrapper">
      {isLoaded
        ? <Button onClick={handleLogout} text="logout" />
        : <p>check user...</p>
      }
    </div>
  );
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Logout;
