import * as Font from "expo-font";
import { useEffect, useState } from "react";

import AuthProvider from "./src/contexts/AuthProvider";
import ProjectProvider from "./src/contexts/ProjectProvider";
import AppNavigator from "./src/navigator/AppNavigator";

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    async function fetchFont() {
      await Font.loadAsync({
        FiraCode: require("./assets/fonts/FiraCode-Regular.ttf"),
        Playball: require("./assets/fonts/Playball-Regular.ttf"),
      });
      setIsFontLoaded(true);
    }

    fetchFont();
  }, []);

  return (
    <>
      {isFontLoaded && (
        <AuthProvider>
          <ProjectProvider>
            <AppNavigator />
          </ProjectProvider>
        </AuthProvider>
      )}
    </>
  );
}
