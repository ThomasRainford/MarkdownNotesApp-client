import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { testCollections } from "../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../utils/types/types";
import SelectedDataProvider from "../../../helper/SelectedDataProvider";
import CollectionView from "../CollectionView";

describe("CollectionView component", () => {
  beforeEach(() => {
    localStorage.removeItem(LocalStorageKeys.SELECTED_COLLECTION);
    localStorage.removeItem(LocalStorageKeys.SELECTED_LIST);
    localStorage.removeItem(LocalStorageKeys.SELECTED_NOTE);
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

    const collection = screen.getByText(title);

    await act(async () => {
      fireEvent.click(collection);
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

  test("Clicking list displays correct list title", async () => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    render(
      <SelectedDataProvider>
        <CollectionView />
      </SelectedDataProvider>
    );

    const title = "List 1";

    const list = screen.getByText(title);

    await act(async () => {
      fireEvent.click(list);
    });

    const listTitle = screen.getAllByRole("heading", {
      name: title,
    });

    expect(
      listTitle.find((ct) => ct.id === "right-pane-heading")?.textContent
    ).toBe(title);
  });

  test("clicking list displays the correct notes", async () => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    render(
      <SelectedDataProvider>
        <CollectionView />
      </SelectedDataProvider>
    );

    const title = "List 1";

    const list = screen.getByText(title);

    await act(async () => {
      fireEvent.click(list);
    });

    const notes = screen.getAllByRole("heading", { name: /note/i });

    expect(notes).toHaveLength(1);
    expect(notes[0].textContent).toBe("Note 1");
  });

  test("Clicking list displays correct list title", async () => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    render(
      <SelectedDataProvider>
        <CollectionView />
      </SelectedDataProvider>
    );

    const title = "List 1";

    const list = screen.getByText(title);

    await act(async () => {
      fireEvent.click(list);
    });

    const listTitle = screen.getAllByRole("heading", {
      name: title,
    });

    expect(
      listTitle.find((ct) => ct.id === "right-pane-heading")?.textContent
    ).toBe(title);
  });
});
