import * as Google from "expo-google-app-auth";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";

/**
 * login user with google auth
 * @returns 3 cases
 *   success: { user },
 *   cancel: { cancel: true },
 *   error: { error: error message }
 */
export default async function loginWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      const { email, name, photoUrl } = result.user;

      return { user: { email, name, photoUrl } };
    }

    return { cancelled: true };
  } catch (err) {
    return { error: err.message };
  }
}
