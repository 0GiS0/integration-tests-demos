export default {
  testEnvironment: "node",
  testMatch: ["**/tests/docker-compose/*.test.js"],
  setupFiles: ["<rootDir>/01_setEnv.js"],
  globalSetup: "<rootDir>/02_globalSetup.js",
  globalTeardown: "<rootDir>/04_globalTeardown.js",
};
