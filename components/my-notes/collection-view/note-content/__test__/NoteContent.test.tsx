import { render } from "@testing-library/react";
import NoteContent from "../NoteContent";

describe("NoteContent component", () => {
  test("Displays the NoteContent component", () => {
    render(<NoteContent />);
  });
});
