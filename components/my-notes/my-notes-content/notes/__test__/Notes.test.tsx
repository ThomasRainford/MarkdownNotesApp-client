import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { Note } from "../../../../../generated/graphql";
import { mockClient } from "../../../../../test-utils/mocks/gql-mocks";
import { testCollections } from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import Notes from "../Notes";

describe("Notes component", () => {
  test("Displays Notes", () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify(testCollections[0].lists[0])
    );
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <Notes />
        </SelectedDataProvider>
      </Provider>
    );

    const note = screen.getByText(/note 1/i);

    expect(note).toBeInTheDocument();
  });

  test("Selects a note that is then stored in local storage.", async () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify(testCollections[0].lists[0])
    );
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <Notes />
        </SelectedDataProvider>
      </Provider>
    );

    const title = "Note 1";

    const note = screen.getByText(title);

    await act(async () => {
      fireEvent.click(note);
    });

    const noteInStorage = localStorage.getItem(LocalStorageKeys.SELECTED_NOTE);
    const selectedNote = JSON.parse(noteInStorage || "{}");

    expect(selectedNote).not.toBeNull();
    expect(JSON.parse(selectedNote).title).toBe(title);
  });

  test("Adds a new note successfully.", async () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify(testCollections[0].lists[0])
    );
    // Render
    render(
      <Provider
        value={mockClient({ note: { create: "success" } }) as unknown as Client}
      >
        <SelectedDataProvider>
          <Notes />
        </SelectedDataProvider>
      </Provider>
    );

    const noteTitle = "Note 2";

    const addNoteButton = screen.getByLabelText(/add-note/i);
    await act(async () => {
      fireEvent.click(addNoteButton);
    });
    const input = screen.getByPlaceholderText(/title/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: noteTitle } });
    });
    const createNoteButton = screen.getByLabelText(/create-note/i);
    await act(async () => {
      fireEvent.click(createNoteButton);
    });
    const newNote = screen.getByRole("heading", {
      name: noteTitle,
    });

    const selectedNote = JSON.parse(
      JSON.parse(localStorage.getItem(LocalStorageKeys.SELECTED_NOTE) || "{}")
    ) as Note;

    expect(newNote).toBeInTheDocument();
    expect(selectedNote.title).toBe(noteTitle);
  });

  test("Fails to add a new note with an empty title.", async () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify(testCollections[0].lists[0])
    );
    // Render
    render(
      <Provider
        value={mockClient({ note: { create: "error" } }) as unknown as Client}
      >
        <SelectedDataProvider>
          <Notes />
        </SelectedDataProvider>
      </Provider>
    );

    const addNoteButton = screen.getByLabelText(/add-note/i);
    await act(async () => {
      fireEvent.click(addNoteButton);
    });
    const input = screen.getByPlaceholderText(/title/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
    });
    const createNoteButton = screen.getByLabelText(/create-note/i);
    await act(async () => {
      fireEvent.click(createNoteButton);
    });

    expect(createNoteButton).toBeInTheDocument();
  });
});
