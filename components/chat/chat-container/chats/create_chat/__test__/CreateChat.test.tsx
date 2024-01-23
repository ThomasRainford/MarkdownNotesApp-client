import { render } from "@testing-library/react";
import CreateChat from "../CreateChat";

describe("CreateChat component", () => {
  test("Displays the component successfully", () => {
    render(<CreateChat />);
  });
});
