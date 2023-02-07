import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { fromValue } from "wonka";
import { sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import {
  CollectionsQuery,
  CollectionsQueryVariables,
  NotesListQuery,
  NotesListQueryVariables,
  NotesListsQuery,
  NotesListsQueryVariables,
} from "../../../../../generated/graphql";
import { createMockUrqlClient } from "../../../../../test-utils/createMockUrqlClient";
import {
  testNotesLists,
  _testCollections,
} from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import LeftPaneContent from "../LeftPaneContent";

describe("LeftPaneContent component", () => {
  test("Displays Collections", () => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
    );
    localStorage.setItem(LocalStorageKeys.SELECTED_LIST, "");
    // Mock URQL client.
    const mockClient = createMockUrqlClient<
      CollectionsQueryVariables | NotesListsQueryVariables,
      sourceT<{ data: CollectionsQuery | NotesListsQuery }>
    >({
      executeQuery: ({ query }) => {
        const queryType = (
          query.definitions[0].name.value as string
        ).toLowerCase();
        switch (queryType) {
          case "collections":
            return fromValue({
              data: {
                collections: _testCollections,
              },
            });
          case "noteslists":
            return fromValue({
              data: {
                notesLists: testNotesLists.collection1,
              },
            });
          default:
            break;
        }
      },
    });
    // Render
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedDataProvider>
          <LeftPaneContent />
        </SelectedDataProvider>
      </Provider>
    );

    const leftPaneContentlHeader = screen.getByText(/collections/i);

    expect(leftPaneContentlHeader).toBeInTheDocument();
  });

  test("Displays the list of collections", () => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
    );
    localStorage.setItem(LocalStorageKeys.SELECTED_LIST, "");
    // Mock URQL client.
    const mockClient = createMockUrqlClient<
      CollectionsQueryVariables | NotesListsQueryVariables,
      sourceT<{ data: CollectionsQuery | NotesListsQuery }>
    >({
      executeQuery: ({ query }) => {
        const queryType = (
          query.definitions[0].name.value as string
        ).toLowerCase();
        switch (queryType) {
          case "collections":
            return fromValue({
              data: {
                collections: _testCollections,
              },
            });
          case "noteslists":
            return fromValue({
              data: {
                notesLists: testNotesLists.collection1,
              },
            });
          default:
            break;
        }
      },
    });
    // Render
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedDataProvider>
          <LeftPaneContent />
        </SelectedDataProvider>
      </Provider>
    );

    const collections = screen.getAllByRole("heading", { name: /collection/i });

    const collectionInList = collections.filter(
      (c, i) => c.id === `collection-heading-${i}`
    );

    expect(collectionInList).toHaveLength(3);
  });

  test("Selects a collection that is then stored in local storage", async () => {
    // Mock URQL client.
    const mockClient = createMockUrqlClient<
      CollectionsQueryVariables | NotesListsQueryVariables,
      sourceT<{ data: CollectionsQuery | NotesListsQuery }>
    >({
      executeQuery: ({ query }) => {
        const queryType = (
          query.definitions[0].name.value as string
        ).toLowerCase();
        switch (queryType) {
          case "collections":
            return fromValue({
              data: {
                collections: _testCollections,
              },
            });
          case "noteslists":
            return fromValue({
              data: {
                notesLists: testNotesLists.collection1,
              },
            });
          default:
            break;
        }
      },
    });
    // Render
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedDataProvider>
          <LeftPaneContent />
        </SelectedDataProvider>
      </Provider>
    );

    const title = "Collection 1";

    const collectionInList = screen.getAllByRole("heading", {
      name: title,
    });

    await act(async () => {
      fireEvent.click(
        collectionInList.find(
          (ct) => ct.id === "collection-heading-1"
        ) as Element
      );
    });

    const collectionInStorage = localStorage.getItem(
      LocalStorageKeys.SELECTED_COLLECTION
    );
    const collection = JSON.parse(collectionInStorage || "{}");

    expect(collection).not.toBeNull();
    expect(JSON.parse(collection).title).toBe(title);
  });

  test("Selecting a list displays the lists in the right pane", async () => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify(testNotesLists.collection1[0])
    );
    // Mock URQL client.
    const mockClient = createMockUrqlClient<
      | CollectionsQueryVariables
      | NotesListsQueryVariables
      | NotesListQueryVariables,
      sourceT<{ data: CollectionsQuery | NotesListsQuery | NotesListQuery }>
    >({
      executeQuery: ({ query }) => {
        const queryType = (
          query.definitions[0].name.value as string
        ).toLowerCase();
        switch (queryType) {
          case "collections":
            return fromValue({
              data: {
                collections: _testCollections,
              },
            });
          case "noteslists":
            return fromValue({
              data: {
                notesLists: testNotesLists.collection1,
              },
            });
          case "noteslist":
            return fromValue({
              data: {
                notesList: testNotesLists.collection1[0],
              },
            });
          default:
            break;
        }
      },
    });
    // Render
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedDataProvider>
          <LeftPaneContent />
        </SelectedDataProvider>
      </Provider>
    );
    const listsElements = screen.getAllByRole("heading", { name: /list/i });

    const lists = listsElements.filter((c, i) => {
      return c.id === `list-heading-${i + 1}`;
    });

    expect(lists).toHaveLength(1);
  });
});
