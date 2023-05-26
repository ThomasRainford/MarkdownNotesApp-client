import { loadEnvConfig } from "@next/env";
import "@testing-library/jest-dom/extend-expect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
