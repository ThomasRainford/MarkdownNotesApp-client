import { render } from "@testing-library/react";
import NewItemInput from "../NewItemInput";

describe("NewItemInput component", () => {
  test("Displays the NewItemInput component", () => {
    render(<NewItemInput type={"collection"} confirmAdd={jest.fn()} />);
  });
});
