import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { LocalStorageKeys } from "../../../../utils/types/types";
import SelectedDataProvider from "../../../helper/SelectedDataProvider";
import CollectionView from "../CollectionView";

describe("CollectionView component", () => {
  beforeEach(() => {
    localStorage.removeItem(LocalStorageKeys.SELECTED_COLLECTION);
  });

  test("Displays CollectionView", async () => {
    render(
      <SelectedDataProvider>
        <CollectionView />
      </SelectedDataProvider>
    );

    const leftPaneContentlHeader = screen.getByText(/collections/i);
    const rightPaneContentHeader = screen.getByText(/select a collection/i);
    const noteContentHeader = screen.getByText(/no note selected/i);

    expect(leftPaneContentlHeader).toBeInTheDocument();
    expect(rightPaneContentHeader).toBeInTheDocument();
    expect(noteContentHeader).toBeInTheDocument();
  });

  test("clicking collection displays correct collection title", async () => {
    render(
      <SelectedDataProvider>
        <CollectionView />
      </SelectedDataProvider>
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
      <SelectedDataProvider>
        <CollectionView />
      </SelectedDataProvider>
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
