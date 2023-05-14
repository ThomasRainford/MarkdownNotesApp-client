import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { mockClient } from "../../../../../test-utils/mocks/gql-mocks";
import { testNotesLists } from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import Notes from "../Notes";

describe("Notes component", () => {
  test("Displays Notes", () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify({ id: "1" })
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify({ id: "1", collectionId: "1" })
    );
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <Notes notes={testNotesLists.collection1[0].notes} />
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
      JSON.stringify({ id: "1" })
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify({ id: "1", collectionId: "1" })
    );
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <Notes notes={testNotesLists.collection1[0].notes} />
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
    expect(JSON.parse(selectedNote).id).toBe("1");
  });
});
