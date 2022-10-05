import React, { useState } from "react";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";

import MainStackNavigation from "./navigations/MainStackNavigation/MainStackNavigation";

import store from "./redux/store";

const cacheBackgroundImage = async () => {
  const images = [
    require("./assets/pngs/home.png"),
    require("./assets/pngs/love.png"),
    require("./assets/pngs/letter.png"),
    require("./assets/pngs/feather.png"),
    require("./assets/pngs/friends.png"),
    require("./assets/pngs/background.png"),
    require("./assets/pngs/letterPage.png")
  ];

  const cacheImages = images.map((image) =>
    Asset.fromModule(image).downloadAsync()
  );

  return Promise.all(cacheImages);
};

function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={cacheBackgroundImage}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainStackNavigation />
    </Provider>
  );
}

export default App;
