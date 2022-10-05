const ENV = {
  dev: {
    FACEBOOK_APP_ID: '<YOUR FACEBOOK APP ID>',
    API_URL: '<YOUR API URL>',
  },
  staging: {
    FACEBOOK_APP_ID: '<YOUR FACEBOOK APP ID>',
    API_URL: '<YOUR API URL>',
  },
};

const getEnvVars = () => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    return ENV.dev;
  } else {
    return ENV.staging;
  }
};

export default getEnvVars;
