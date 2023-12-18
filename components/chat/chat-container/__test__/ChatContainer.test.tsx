import { render, screen } from "@testing-library/react";
import ChatPageContainer from "../ChatContainer";

describe("ChatPageContainer component", () => {
  test("Displays the given children", () => {
    const children = "Hello World!";

    render(<ChatPageContainer />);

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
