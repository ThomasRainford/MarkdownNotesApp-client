import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { SelectedCollectionProvider } from "../../../../../contexts/SelectedCollectionContext";
import { SelectedListProvider } from "../../../../../contexts/SelectedListContext";
import { testCollections } from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import RightPaneContent from "../RightPaneContent";

describe("RightPaneContent component", () => {
  beforeAll(() => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
  });

  test("Displays Lists", () => {
    render(
      <SelectedCollectionProvider>
        <SelectedListProvider>
          <RightPaneContent />
        </SelectedListProvider>
      </SelectedCollectionProvider>
    );

    const rightPaneContentlHeader = screen.getByText(/collection 1/i);
    const listInList = screen.getByText(/list 1/i);

    expect(rightPaneContentlHeader).toBeInTheDocument();
    expect(listInList).toBeInTheDocument();
  });

  test("Selects a list that is stored in local storage", async () => {
    render(
      <SelectedCollectionProvider>
        <SelectedListProvider>
          <RightPaneContent />
        </SelectedListProvider>
      </SelectedCollectionProvider>
    );

    const title = "List 1";

    const listList = screen.getByText(title);

    await act(async () => {
      fireEvent.click(listList);
    });

    const listnStorage = localStorage.getItem(LocalStorageKeys.SELECTED_LIST);
    const list = JSON.parse(listnStorage || "{}");

    expect(list).not.toBeNull();
    expect(JSON.parse(list).title).toBe(title);
  });

  test("Selecting a list displays the lists notes", async () => {
    render(
      <SelectedCollectionProvider>
        <SelectedListProvider>
          <RightPaneContent />
        </SelectedListProvider>
      </SelectedCollectionProvider>
    );

    const title = "List 1";
    const listList = screen.getByText(title);
    await act(async () => {
      fireEvent.click(listList);
    });

    const note = screen.getByText(/note 1/i);

    expect(note).toBeInTheDocument();
  });
});
