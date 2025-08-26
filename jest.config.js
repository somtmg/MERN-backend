// jest.config.js
module.exports = {
  // Use the jsdom environment for browser-like testing
  testEnvironment: "jsdom",
  // jest.config.js
  testMatch: [
    "**/__tests__/**/*.js",
    "**/*.spec.js",
    "**/*.test.js",
    "**/*.jest.js", // Custom pattern
  ],

  // A map from regular expressions to module names or module name arrays
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/__mocks__/fileMock.js",
  },

  // A list of paths to modules that run after the test framework is installed
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
}
