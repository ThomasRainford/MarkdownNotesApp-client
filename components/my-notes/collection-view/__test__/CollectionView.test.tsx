import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { LocalStorageProvider } from "../../../../contexts/LocalStorageContext";
import { LocalStorageKeys } from "../../../../utils/types/types";
import CollectionView from "../CollectionView";

beforeEach(() => {
  localStorage.removeItem(LocalStorageKeys.SELECTED_COLLECTION);
});

test("Displays CollectionView", async () => {
  render(
    <LocalStorageProvider storageKey={LocalStorageKeys.SELECTED_COLLECTION}>
      <CollectionView />
    </LocalStorageProvider>
  );

  const collectionPanelHeader = screen.getByText(/collections/i);

  expect(collectionPanelHeader).toBeInTheDocument();
});

test("clicking collection displays correct collection title", async () => {
  render(
    <LocalStorageProvider storageKey={LocalStorageKeys.SELECTED_COLLECTION}>
      <CollectionView />
    </LocalStorageProvider>
  );

  const title = "Collection 1";

  const collectionInList = screen.getByText(title);

  await act(async () => {
    fireEvent.click(collectionInList);
  });

  const collectionTitle = screen.getAllByRole("heading", {
    name: title,
  });

  expect(
    collectionTitle.find((ct) => ct.id === "list-collection-heading")
      ?.textContent
  ).toBe(title);
});

test("clicking collection displays the correct lists", async () => {
  render(
    <LocalStorageProvider storageKey={LocalStorageKeys.SELECTED_COLLECTION}>
      <CollectionView />
    </LocalStorageProvider>
  );

  const title = "Collection 1";

  const collectionInList = screen.getByText(title);

  await act(async () => {
    fireEvent.click(collectionInList);
  });

  const lists = screen.getAllByRole("heading", { name: /list/i });

  expect(lists).toHaveLength(1);
  expect(lists[0].textContent).toBe("List 1");
});
