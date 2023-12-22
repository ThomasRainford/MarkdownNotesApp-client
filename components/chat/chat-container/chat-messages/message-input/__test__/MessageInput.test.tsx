import { render } from "@testing-library/react";
import MessageInput from "../MessageInput";

describe("MessageInput component", () => {
  test("Displays the component successfully", () => {
    render(<MessageInput />);
  });
});
