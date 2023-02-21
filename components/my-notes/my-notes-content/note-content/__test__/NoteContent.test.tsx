import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { mockClient } from "../../../../../test-utils/mocks/gql-mocks";
import {
  testCollections,
  testSelectedNote,
  _testCollections,
} from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import NoteContent from "../NoteContent";

describe("NoteContent component", () => {
  test("Displays correct collection, list and note", () => {
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
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <NoteContent />
        </SelectedDataProvider>
      </Provider>
    );

    const note = screen.getByText(/note 1/i);

    expect(note).toBeInTheDocument();
  });

  test("Edit a note title successfully.", async () => {
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
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <NoteContent />
        </SelectedDataProvider>
      </Provider>
    );

    const newNoteTitle = "Note 1 updated";

    const updateNoteButton = screen.getByLabelText(/update-note-title/i);
    await act(async () => {
      fireEvent.click(updateNoteButton);
    });
    const input = screen.getByDisplayValue(/note 1/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: newNoteTitle } });
    });
    const confirmUpdateNoteButton = screen.getByLabelText("update-note-title");
    await act(async () => {
      fireEvent.click(confirmUpdateNoteButton);
    });

    const newNoteHeading = screen.getByRole("heading", { name: newNoteTitle });

    expect(newNoteHeading).toBeInTheDocument();
  });

  test("Edit a note title that is outside of the selected collection.", async () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[1])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_NOTE,
      JSON.stringify(testSelectedNote)
    );
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <NoteContent />
        </SelectedDataProvider>
      </Provider>
    );

    const newNoteTitle = "Note 1 updated";

    const updateNoteButton = screen.getByLabelText(/update-note-title/i);
    await act(async () => {
      fireEvent.click(updateNoteButton);
    });
    const input = screen.getByDisplayValue(/note 1/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: newNoteTitle } });
    });
    const confirmUpdateNoteButton = screen.getByLabelText("update-note-title");
    await act(async () => {
      fireEvent.click(confirmUpdateNoteButton);
    });

    const newNoteHeading = screen.getByRole("heading", { name: newNoteTitle });

    expect(newNoteHeading).toBeInTheDocument();
  });
});
