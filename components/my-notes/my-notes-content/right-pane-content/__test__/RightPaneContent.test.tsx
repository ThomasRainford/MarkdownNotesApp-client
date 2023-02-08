import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { mockClient } from "../../../../../test-utils/mocks/gql-mocks";
import { _testCollections } from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import RightPaneContent from "../RightPaneContent";

describe("RightPaneContent component", () => {
  beforeAll(() => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
    );
  });

  test("Displays Lists", () => {
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <RightPaneContent />
        </SelectedDataProvider>
      </Provider>
    );

    const rightPaneContentlHeader = screen.getByText(/collection 1/i);
    const listInList = screen.getByText(/list 1/i);

    expect(rightPaneContentlHeader).toBeInTheDocument();
    expect(listInList).toBeInTheDocument();
  });

  test("Selects a list that is then stored in local storage", async () => {
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <RightPaneContent />
        </SelectedDataProvider>
      </Provider>
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
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <RightPaneContent />
        </SelectedDataProvider>
      </Provider>
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
