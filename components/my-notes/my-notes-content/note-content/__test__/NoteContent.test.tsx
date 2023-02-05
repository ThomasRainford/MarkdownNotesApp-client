import { render, screen } from "@testing-library/react";
import {
  testCollections,
  testSelectedNote,
} from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import NoteContent from "../NoteContent";

describe("NoteContent component", () => {
  test("Displays correct collection, list and note", () => {
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

    render(
      <SelectedDataProvider>
        <NoteContent />
      </SelectedDataProvider>
    );

    const note = screen.getByText(/note 1/i);

    expect(note).toBeInTheDocument();
  });
});
