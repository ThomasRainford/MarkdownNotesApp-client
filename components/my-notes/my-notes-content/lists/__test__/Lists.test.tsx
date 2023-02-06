import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { fromValue } from "wonka";
import { sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import { SelectedCollectionProvider } from "../../../../../contexts/SelectedCollectionContext";
import { SelectedListProvider } from "../../../../../contexts/SelectedListContext";
import {
  NotesListsQuery,
  NotesListsQueryVariables,
} from "../../../../../generated/graphql";
import { createMockUrqlClient } from "../../../../../test-utils/createMockUrqlClient";
import {
  testNotesLists,
  _testCollections,
} from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import Lists from "../Lists";

describe("Lists component", () => {
  test("Displays Lists", () => {
    // Local storage.
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
    );
    // Mock URQL client.
    const mockClient = createMockUrqlClient<
      NotesListsQueryVariables,
      sourceT<{ data: NotesListsQuery }>
    >({
      executeQuery: () => {
        return fromValue({
          data: {
            notesLists: testNotesLists.collection1,
          },
        });
      },
    });
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedCollectionProvider>
          <SelectedListProvider>
            <Lists />
          </SelectedListProvider>
        </SelectedCollectionProvider>
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
    // Mock URQL client.
    const mockClient = createMockUrqlClient<
      NotesListsQueryVariables,
      sourceT<{ data: NotesListsQuery }>
    >({
      executeQuery: () => {
        return fromValue({
          data: {
            notesLists: testNotesLists.collection1,
          },
        });
      },
    });
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedCollectionProvider>
          <SelectedListProvider>
            <Lists />
          </SelectedListProvider>
        </SelectedCollectionProvider>
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
