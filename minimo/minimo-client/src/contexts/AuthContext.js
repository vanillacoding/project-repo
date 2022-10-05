import PropTypes from 'prop-types';
import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import firebase from '../apis/firebase.config';
import authReducer, { TYPES } from '../reducers/authReducer';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const AuthContext = createContext();

const initialState = {
  authenticated: false,
  isLoading: false,
  error: {},
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function fetchUserData() {
      const idToken = await user.getIdToken();
      // TODO: IdToken 검정
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          idToken,
        }),
      };

      try {
        dispatch({ type: TYPES.AUTH_TRY });
        const response = await fetch(`${SERVER_URL}/user`, requestOptions);
        const data = await response.json();

        setUserId(data.data._id);
        dispatch({ type: TYPES.AUTH_SUCCESS });
      } catch (error) {
        const msg = error.message;
        dispatch({ type: TYPES.AUTH_ERROR, payload: msg });
      }
    }

    fetchUserData();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, userId, authState }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element,
};
