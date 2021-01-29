module.exports = {
    preset: "ts-jest",
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    moduleNameMapper: {
      "^@/components(.*)$": "<rootDir>/src/components/$1",
      "^@/containers(.*)$": "<rootDir>/src/containers/$1",
      "^@/pages(.*)$": "<rootDir>/pages/$1",
      "^@/hooks(.*)$": "<rootDir>/src/hooks/$1",
      "^@/utils(.*)$": "<rootDir>/src/utils/$1",
      "^@/lib(.*)$": "<rootDir>/src/lib/$1",
    },
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    }
  };