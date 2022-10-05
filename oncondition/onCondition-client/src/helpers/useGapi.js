import { useState, useEffect } from "react";
import USER_INFO_SCOPE from "../constants/userInfoScope";

function useGapi() {
  const [gapi, setGapi] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleGoogleAuth2 = async function () {
    const params = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: USER_INFO_SCOPE,
      ux_mode: "redirect",
    };

    await window.gapi.auth2.init(params);
  };

  const handleLoad = async function () {
    if (!window.gapi) {
      return;
    }

    await window.gapi.load("auth2", handleGoogleAuth2);
    setGapi(window.gapi);
    setIsLoaded(true);
  };

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.addEventListener("load", handleLoad);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      document.body.removeChild(script);
    };
  }, []);

  return [gapi, isLoaded];
}

export { useGapi };
