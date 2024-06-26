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
    "<rootDir>/components/notes/notes-container/__test__/NotesContainer.test.tsx",
    "<rootDir>/components/notes/notes-content/right-pane-content/__test__/RightPaneContent.test.tsx",
  ],
  moduleNameMapper: {
    "react-markdown": "<rootDir>/test-utils/mocks/react-markdown.tsx",
    "remark-gfm": "<rootDir>/test-utils/mocks/remark-gfm.ts",
    "remark-directive": "<rootDir>/test-utils/mocks/remark-directive.ts",
    hastscript: "<rootDir>/test-utils/mocks/hastscript.ts",
    "unist-util-visit": "<rootDir>/test-utils/mocks/unist-util-visit.ts",
  },
};

module.exports = createJestConfig(customJestConfig);
