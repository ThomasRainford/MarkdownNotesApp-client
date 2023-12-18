import { render } from "@testing-library/react";
import Chatinfo from "../ChatInfo";

describe("BaseTemplate component", () => {
  test("Displays the given children", () => {
    render(<Chatinfo chat={undefined} />);
  });
});
