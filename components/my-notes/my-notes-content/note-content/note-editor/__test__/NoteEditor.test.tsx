import { render, screen } from "@testing-library/react";
import { Client, Provider } from "urql";
import { Note } from "../../../../../../generated/graphql";
import { mockClient } from "../../../../../../test-utils/mocks/gql-mocks";
import { testSelectedNote } from "../../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../../utils/types/types";
import SelectedDataProvider from "../../../../../helper/SelectedDataProvider";
import NoteEditor from "../NoteEditor";

describe("NoteEditor component", () => {
  test("Displays the note text", () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify({ id: "1" })
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify({ id: "1", collectionId: "1" })
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_NOTE,
      JSON.stringify({ id: "1", collectionId: "1", notesList: "1" })
    );
    // Render
    const options = { note: { update: { body: testSelectedNote.body } } };
    const noteBody = options.note.update.body;
    render(
      <Provider value={mockClient(options) as unknown as Client}>
        <SelectedDataProvider>
          <NoteEditor note={testSelectedNote as unknown as Note} />
        </SelectedDataProvider>
      </Provider>
    );

    expect(screen.getByText(noteBody)).toBeInTheDocument();
  });
});
