import { loadEnvConfig } from "@next/env";
import "@testing-library/jest-dom/extend-expect";

export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
