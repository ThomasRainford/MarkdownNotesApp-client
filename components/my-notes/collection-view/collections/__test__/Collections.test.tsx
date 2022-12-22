import { render, screen } from "@testing-library/react";
import { LocalStorageProvider } from "../../../../../contexts/LocalStorageContext";
import { testCollections } from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import Collections from "../Collections";

test("Displays Collections", () => {
  localStorage.setItem(
    LocalStorageKeys.SELECTED_COLLECTION,
    JSON.stringify(testCollections[0])
  );
  render(
    <LocalStorageProvider storageKey={LocalStorageKeys.SELECTED_COLLECTION}>
      <Collections />
    </LocalStorageProvider>
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
    <LocalStorageProvider storageKey={LocalStorageKeys.SELECTED_COLLECTION}>
      <Collections />
    </LocalStorageProvider>
  );

  const collections = screen.getAllByRole("heading", { name: /collection/i });

  const collectionInList = collections.filter(
    (c, i) => c.id === `collection-header-${i}`
  );

  expect(collectionInList).toHaveLength(3);
});
