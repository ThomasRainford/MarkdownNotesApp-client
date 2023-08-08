import { testNotesLists } from "../../../../../test-utils/testData";
import { Props } from "./NoteEditor";

const base: Props = {
  note: testNotesLists.collection1[0].notes[0],
  readOnly: false,
};

export const mockNoteEditorProps = {
  base,
};
