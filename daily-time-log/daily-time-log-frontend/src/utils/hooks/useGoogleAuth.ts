import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { apiKey, clientId, scopes } from "../../config/google";
import { useAppDispatch } from "../../app/store";
import { logIn, logOut } from "../../features/auth/authSlice";
import { initMilestones } from "../../features/milestones/milestonesSlice";
import { initGoogleSchedules } from "../../features/schedules/schedulesSlice";
import { initCalendar } from "../../features/calendar/calendarSlice";

function useGoogleAuth() {
  const googleAuth = useRef(null);

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    const initClient = async () => {
      await window.gapi.client.init({
        apiKey,
        clientId,
        scope: scopes,
      });

      googleAuth.current = window.gapi.auth2.getAuthInstance();
      googleAuth.current.isSignedIn.listen(updateSignInStatus);

      updateSignInStatus(googleAuth.current.isSignedIn.get());
    };

    const updateSignInStatus = async (isSignedIn: boolean) => {
      if (isSignedIn) {
        const userData = googleAuth.current.currentUser.get();
        const basicProfile = userData.getBasicProfile();
        const authResponse = userData.getAuthResponse(true);

        dispatch(
          logIn({
            isLogIn: true,
            isLoading: false,
            email: basicProfile.getEmail(),
            name: basicProfile.getName(),
            imageUrl: basicProfile.getImageUrl(),
            googleAccessToken: authResponse.access_token,
          }),
        );

        history.push("/calendar");
      } else {
        dispatch(logOut());
        dispatch(initCalendar());
        dispatch(initMilestones());
        dispatch(initGoogleSchedules());

        history.push("/");
      }
    };

    window.gapi.load("client:auth2", initClient);
  }, []);

  const googleSignIn = () => {
    googleAuth.current.signIn();
  };

  const googleSignOut = () => {
    googleAuth.current.signOut();
  };

  return { googleSignIn, googleSignOut };
}

export default useGoogleAuth;
