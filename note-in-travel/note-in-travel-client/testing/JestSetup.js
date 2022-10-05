import React from "react";
import {
  StyleSheet, Text, View, Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export const Screen1 = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Screen 1</Text>
    <Button title="Go to Screen 2" onPress={() => navigation.push("Screen2")} />
    <StatusBar />
  </View>
);

export const Screen2 = () => (
  <View style={styles.container}>
    <Text>Screen 2</Text>
    <StatusBar />
  </View>
);

const Stack = createStackNavigator();
export const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Screen1" component={Screen1} />
    <Stack.Screen name="Screen2" component={Screen2} />
  </Stack.Navigator>
);

const SignIn = () => (
  <View style={styles.container}>
    <Text>Sign In</Text>
    <StatusBar />
  </View>
);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
);

export default ({ isLoggedIn = true }) => (
  <NavigationContainer>
    {isLoggedIn ? <AppStack /> : <AuthStack />}
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
