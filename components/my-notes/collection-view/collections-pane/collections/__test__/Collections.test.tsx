import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { SelectedCollectionProvider } from "../../../../../../contexts/SelectedCollectionContext";
import { testCollections } from "../../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../../utils/types/types";
import Collections from "../Collections";

describe("Collections tests", () => {
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
      (c, i) => c.id === `collection-header-${i + 1}`
    );

    expect(collectionInList).toHaveLength(3);
  });

  test("Selects a collection that is stored in local storage", async () => {
    render(
      <SelectedCollectionProvider>
        <Collections />
      </SelectedCollectionProvider>
    );

    const title = "Collection 1";

    const collectionInList = screen.getByText(title);

    await act(async () => {
      fireEvent.click(collectionInList);
    });

    const collectionInStorage = localStorage.getItem(
      LocalStorageKeys.SELECTED_COLLECTION
    );
    const collection = JSON.parse(collectionInStorage || "{}");

    expect(collection).not.toBeNull();
    expect(JSON.parse(collection).title).toBe(title);
  });
});
