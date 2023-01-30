import * as SecureStore from "expo-secure-store";
import PropTypes from "prop-types";
import React, { useState, useEffect, createContext } from "react";

import api from "../api/api";
import axiosInstance from "../api/axiosInstance";

export const UserContext = createContext(null);

function AuthProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = await SecureStore.getItemAsync("token");

        if (!token) {
          setIsChecked(true);
          setLoggedInUser(null);

          return;
        }

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        if (!isChecked) {
          const data = await api.postAuthCheck();

          if (data.err) {
            throw data.err;
          }

          if (data.user) {
            setLoggedInUser(data.user);
            setIsChecked(true);
          }
        }
      } catch (err) {
        console.log(err);
        setLoggedInUser(null);
        setIsChecked(true);
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      {isChecked && (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          {children}
        </UserContext.Provider>
      )}
    </>
  );
}

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.element,
};
