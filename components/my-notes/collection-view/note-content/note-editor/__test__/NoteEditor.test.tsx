import { render, screen } from "@testing-library/react";
import NoteEditor from "../NoteEditor";

describe("NoteEditor component", () => {
  test("Displays the note text", () => {
    const markdownText = "Hello World!";

    render(<NoteEditor markdownText={markdownText} />);

    expect(screen.getByText(markdownText)).toBeInTheDocument();
  });
});
