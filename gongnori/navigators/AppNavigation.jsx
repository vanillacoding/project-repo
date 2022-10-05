import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./StackNavigator";
import LoginScreen from "../screens/LoginScreen";
import LocationScreen from "../screens/LocationScreen";
import LoginRequest from "../components/LoginRequest";

import { setInitialize } from "../actions/appActionCreators";

export default function AppNavigation() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const isLoginRequest = useSelector((state) => state.loading.isLoginRequest);

  const hasLocation = useSelector((state) => {
    return !!state.user.locations.length;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialize());
  }, []);

  return (
    <NavigationContainer>
      {
        isLogin
          ? (
            <>
              {!hasLocation ? <LocationScreen /> : <StackNavigator />}
            </>
          )
          : (isLoginRequest ? <LoginRequest /> : <LoginScreen />)
      }
    </NavigationContainer>
  );
}
