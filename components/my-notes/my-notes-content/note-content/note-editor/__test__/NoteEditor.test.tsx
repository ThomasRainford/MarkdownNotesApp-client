import { render, screen } from "@testing-library/react";
import { Client, Provider } from "urql";
import { mockClient } from "../../../../../../test-utils/mocks/gql-mocks";
import {
  testCollections,
  testSelectedNote,
} from "../../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../../utils/types/types";
import SelectedDataProvider from "../../../../../helper/SelectedDataProvider";
import NoteEditor from "../NoteEditor";

describe("NoteEditor component", () => {
  test("Displays the note text", () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify(testCollections[0].lists[0])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_NOTE,
      JSON.stringify(testSelectedNote)
    );
    // Render
    const options = { note: { update: { body: testSelectedNote.body } } };
    const noteBody = options.note.update.body;
    render(
      <Provider value={mockClient(options) as unknown as Client}>
        <SelectedDataProvider>
          <NoteEditor markdownText={noteBody} />
        </SelectedDataProvider>
      </Provider>
    );

    expect(screen.getByText(noteBody)).toBeInTheDocument();
  });
});
