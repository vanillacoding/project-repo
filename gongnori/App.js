import React from "react";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from "@expo-google-fonts/noto-sans-kr";

import store from "./store/store";
import AppNavigtion from "./navigators/AppNavigation";
LogBox.ignoreAllLogs();

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansKR_100Thin,
    NotoSansKR_300Light,
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
    NotoSansKR_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <AppNavigtion />
    </Provider>
  );
}
