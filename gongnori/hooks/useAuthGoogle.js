/**
 * @function it return google authentication functions
 * @return {Array} signInGoogle - it invokes google prompt screen
 * @return {Array} getGoogleUserInfo - it request google user information throught OAuth2.0
 */

import { useCallback } from "react";
import * as Google from "expo-auth-session/providers/google";
import CLIENT_ID from "../config/auth";

const GOOGLE_OAUTH_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

export default function useAuthGoogle() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: CLIENT_ID.expo,
    webClientId: CLIENT_ID.web,
    prompt: "select_account",
  });

  const signInGoogle = useCallback(() => {
    if (!request) { return }
    promptAsync();
  }, [request]);

  const getGoogleUserInfo = useCallback(async () => {
    if (!response) { return }

    if (response.type === "success") {
      const accessToken = response.authentication.accessToken;
      const res = await fetch(GOOGLE_OAUTH_URL, {
        method: "GET",
        headers: { "Authorization": `Bearer ${accessToken}` },
      });
      const userInfo = await res.json();

      return userInfo;
    }
  }, [response]);

  return [signInGoogle, getGoogleUserInfo];
}
