module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  verbose: true,
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  preset: "ts-jest",
  testMatch: ["<rootDir>/**/test/unit/**/*.test.ts"],
  setupFilesAfterEnv: ["jest-extended/all", "./unit-test.setup.ts"],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
