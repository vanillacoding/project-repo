import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";

import { UserContext } from "../contexts/AuthProvider";
import Deploy from "../pages/Deploy";
import Deployed from "../pages/Deployed";
import Editor from "../pages/Editor";
import Home from "../pages/Home";
import Performance from "../pages/Performance";
import ProjectList from "../pages/ProjectList";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppNavigator() {
  const { loggedInUser } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        {!loggedInUser ? (
          <>
            <Screen name="Home" component={Home} />
            <Screen name="SignIn" component={SignIn} />
            <Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Screen name="ProjectList" component={ProjectList} />
            <Screen name="Editor" component={Editor} />
            <Screen name="Deploy" component={Deploy} />
            <Screen name="Deployed" component={Deployed} />
            <Screen name="Performance" component={Performance} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
}
