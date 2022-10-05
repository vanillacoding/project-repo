import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { NavigationContainer } from "@react-navigation/native";

import AppStackNavigator from "../navigations/AppStackNavigator";
import Loading from "../components/Loading";
import {
  getAccessToken,
  clearUser,
  clearAccessToken,
} from "../redux/slices/userSlice";

const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAccessToken = async () => {
      try {
        const resultAction = await dispatch(getAccessToken());
        unwrapResult(resultAction);
      } catch (err) {
        dispatch(clearUser());
        await dispatch(clearAccessToken());
      } finally {
        setIsLoading(false);
      }
    };

    loadAccessToken();
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
      )}
    </>
  );
};

export default AppNavigation;
