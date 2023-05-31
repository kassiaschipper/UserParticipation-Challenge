module.exports = {
    clearMocks: true,
    collectCoverage: false,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    moduleDirectories: ["node_modules", "api"],
    testEnvironment: "node",
    testMatch: ["**/*.spec.js"],
  };