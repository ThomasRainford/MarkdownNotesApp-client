import { sum } from "../lib/sum";

it("returns the sum of two numbers", () => {
  const result = sum(1, 1);
  expect(result).toBe(2);
});
