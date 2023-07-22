const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  clearMocks: true,
  moduleDirectories: [
    "node_modules",
    "components/**/**/__test__",
    "__test__/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/e2e",
    // Temporarily skip test suite due to issue.
    "<rootDir>/components/notes/notes-content/__test__/NotesContent.test.tsx",
  ],
};

module.exports = createJestConfig(customJestConfig);
