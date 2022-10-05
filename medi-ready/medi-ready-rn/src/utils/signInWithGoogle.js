import * as Google from "expo-google-app-auth";

import CLIENT_ID from "../config/auth";
import { PATIENT, GOOGLE_SIGN_IN } from "../constants/auth";

const signInWithGoogle = async () => {
  try {
    const result = await Google.logInAsync(CLIENT_ID);

    if (result.type === GOOGLE_SIGN_IN.SUCCESS) {
      const { name, email, photoUrl } = result.user;

      const userData = {
        user_type: PATIENT,
        picture: photoUrl,
        name,
        email,
      };

      return userData;
    } else {
      return;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default signInWithGoogle;
