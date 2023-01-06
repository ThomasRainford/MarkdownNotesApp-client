import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { SelectedCollectionProvider } from "../../../../contexts/SelectedCollectionContext";
import { LocalStorageKeys } from "../../../../utils/types/types";
import CollectionView from "../CollectionView";

describe("CollectionView component", () => {
  beforeEach(() => {
    localStorage.removeItem(LocalStorageKeys.SELECTED_COLLECTION);
  });

  test("Displays CollectionView", async () => {
    render(
      <SelectedCollectionProvider>
        <CollectionView />
      </SelectedCollectionProvider>
    );

    const leftPaneContentlHeader = screen.getByText(/collections/i);

    expect(leftPaneContentlHeader).toBeInTheDocument();
  });

  test("clicking collection displays correct collection title", async () => {
    render(
      <SelectedCollectionProvider>
        <CollectionView />
      </SelectedCollectionProvider>
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
      collectionTitle.find((ct) => ct.id === "right-pane-heading")?.textContent
    ).toBe(title);
  });

  test("clicking collection displays the correct lists", async () => {
    render(
      <SelectedCollectionProvider>
        <CollectionView />
      </SelectedCollectionProvider>
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
});
