module.exports = {
  testEnvironment: "node",
  globalTeardown: "<rootDir>/test-teardown-globals.js",
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
};
