import Constants from "expo-constants";

const ENV = {
  dev: {
    IOS_CLIENT_ID: "963578997140-28kvep4499hlilurpb94r1g342gru1fn.apps.googleusercontent.com",
    ANDROID_CLIENT_ID: "963578997140-16dj3j9kgbokqd36o9085dhc24ki4310.apps.googleusercontent.com",
    API_SERVER_URL: "https://api.mediready.kr",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
};

export default getEnvVars;
