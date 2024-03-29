import { loadEnvConfig } from "@next/env";
import "@testing-library/jest-dom/extend-expect";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
