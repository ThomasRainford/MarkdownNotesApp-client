import { render, screen } from "@testing-library/react";
import BaseTemplate from "../BaseTemplate";

describe("BaseTemplate component", () => {
  test("Displays the given children", () => {
    const children = "Hello World!";

    render(<BaseTemplate>{children}</BaseTemplate>);

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
