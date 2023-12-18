import { render } from "@testing-library/react";
import Chats from "../Chats";

describe("Chats component", () => {
  test("Displays the given children", () => {
    render(<Chats chats={[]} />);
  });
});
