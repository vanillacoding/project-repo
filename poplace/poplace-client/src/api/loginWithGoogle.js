import * as Google from "expo-google-app-auth";
import getEnvVars from "../config/environment";
const { IOS_CLIENT_ID, ANDROID_CLIENT_ID } = getEnvVars();

export default async function loginWithGoogle() {
  try {
    const result = await Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      const { email } = result.user;

      return { success: true, user: { email } };
    }

  } catch (err) {
    return { success: false };
  }
}
