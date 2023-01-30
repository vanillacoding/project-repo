import { useNavigate } from "react-router-dom";

import { getUser } from "../api/authApi";
import { signInWithGoogle } from "../config/firebaseConfig";

export default function useLogin() {
  const navigate = useNavigate();

  return async (event) => {
    try {
      event.preventDefault();

      const authData = await signInWithGoogle();
      const token = await authData.user.getIdToken();
      const { email, displayName, photoURL, uid } = authData.user;

      const userData = await getUser(
        { email, displayName, photoUrl: photoURL, uid },
        token
      );

      const { projects } = userData;

      if (!projects?.length) {
        navigate("/console/projects", { replace: true });
      } else {
        const initialProjectId = projects[0];

        navigate(`/console/projects/${initialProjectId}`, { replace: true });
      }
    } catch (error) {
      navigate("/error");
    }
  };
}
