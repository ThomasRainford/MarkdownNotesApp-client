import { render, screen } from "@testing-library/react";
import { SelectedCollectionProvider } from "../../../../../contexts/SelectedCollectionContext";
import { SelectedListProvider } from "../../../../../contexts/SelectedListContext";
import { testCollections } from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import Notes from "../Notes";

describe("Notes component", () => {
  test("Displays Notes", () => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify(testCollections[0].lists[0])
    );

    render(
      <SelectedCollectionProvider>
        <SelectedListProvider>
          <Notes />
        </SelectedListProvider>
      </SelectedCollectionProvider>
    );

    const note = screen.getByText(/note 1/i);

    expect(note).toBeInTheDocument();
  });
});
