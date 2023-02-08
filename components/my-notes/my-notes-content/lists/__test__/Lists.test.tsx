import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { mockClient } from "../../../../../test-utils/mocks/gql-mocks";
import { _testCollections } from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import Lists from "../Lists";

describe("Lists component", () => {
  test("Displays Lists", () => {
    // Local storage.
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
    );
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <Lists />
        </SelectedDataProvider>
      </Provider>
    );

    const listInList = screen.getByText(/list 1/i);

    expect(listInList).toBeInTheDocument();
  });

  test("Selects a list that is stored in local storage", async () => {
    // Local storage.
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
    );
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <Lists />
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
});
