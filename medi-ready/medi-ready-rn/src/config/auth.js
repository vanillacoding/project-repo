import getEnvVars from "../../environment";

const { IOS_CLIENT_ID, ANDROID_CLIENT_ID } = getEnvVars();

const CLIENT_ID = {
  androidStandaloneAppClientId: ANDROID_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
  iosStandaloneAppClientId: IOS_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  scopes: ["profile", "email"],
};

export default CLIENT_ID;
