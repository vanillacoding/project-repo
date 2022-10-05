import GoogleLogin from "react-google-login";

export default function LoginButton({ onSuccess, onFailure, customStyle }) {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Log in with Google"
      render={customStyle}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}
