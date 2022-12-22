import { render, screen } from "@testing-library/react";
import ResizeablePanel from "../ResizablePanel";

describe("ResizablePanel component", () => {
  test("Displays the given children", () => {
    const panel = "panel";
    const content = "content";

    render(<ResizeablePanel panel={panel} content={content} />);

    expect(screen.getByText(panel)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
