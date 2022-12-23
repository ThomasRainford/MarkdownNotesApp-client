import { render, screen } from "@testing-library/react";
import { SelectedCollectionProvider } from "../../../../../contexts/SelectedCollectionContext";
import { testCollections } from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import Collections from "../Collections";

describe("Collections component", () => {
  test("Displays Collections", () => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    render(
      <SelectedCollectionProvider>
        <Collections />
      </SelectedCollectionProvider>
    );

    const collectionPanelHeader = screen.getByText(/collections/i);

    expect(collectionPanelHeader).toBeInTheDocument();
  });

  test("Displays the list of collections", () => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections)
    );
    render(
      <SelectedCollectionProvider>
        <Collections />
      </SelectedCollectionProvider>
    );

    const collections = screen.getAllByRole("heading", { name: /collection/i });

    const collectionInList = collections.filter(
      (c, i) => c.id === `collection-header-${i}`
    );

    expect(collectionInList).toHaveLength(3);
  });
});
