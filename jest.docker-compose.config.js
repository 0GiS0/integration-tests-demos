export default {
  testEnvironment: 'node',
  testMatch: ['**/tests-legacy-docker-compose/03_*.test.js'],
  setupFiles: ['<rootDir>/tests-legacy-docker-compose/01_setEnv.js'],
  globalSetup: '<rootDir>/tests-legacy-docker-compose/02_globalSetup.js',
  globalTeardown: '<rootDir>/tests-legacy-docker-compose/04_globalTeardown.js',
};
