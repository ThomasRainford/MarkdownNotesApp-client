import { act, fireEvent, render, screen } from "@testing-library/react";
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
} from "../../../../generated/graphql";
import { createMockUrqlClient } from "../../../../test-utils/createMockUrqlClient";
import {
  testNotesLists,
  _testCollections,
} from "../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../utils/types/types";
import SelectedDataProvider from "../../../helper/SelectedDataProvider";
import MyNotesContent from "../MyNotesContent";

describe("MyNotesContent component", () => {
  beforeEach(() => {
    localStorage.removeItem(LocalStorageKeys.SELECTED_COLLECTION);
    localStorage.removeItem(LocalStorageKeys.SELECTED_LIST);
    localStorage.removeItem(LocalStorageKeys.SELECTED_NOTE);
  });

  test("Displays MyNotesContent", async () => {
    // Mock URQL client.
    const mockClient = createMockUrqlClient<
      CollectionsQueryVariables,
      sourceT<{ data: CollectionsQuery }>
    >({
      executeQuery: () => {
        return fromValue({
          data: {
            collections: _testCollections,
          },
        });
      },
    });
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedDataProvider>
          <MyNotesContent />
        </SelectedDataProvider>
      </Provider>
    );

    const leftPaneContentlHeader = screen.getByText(/collections/i);
    const rightPaneContentHeader = screen.getByText(/select a collection/i);
    const noteContentHeader = screen.getByText(/no note selected/i);

    expect(leftPaneContentlHeader).toBeInTheDocument();
    expect(rightPaneContentHeader).toBeInTheDocument();
    expect(noteContentHeader).toBeInTheDocument();
  });

  test("clicking collection displays correct collection title", async () => {
    // Mock URQL client.
    const mockClient = createMockUrqlClient<
      CollectionsQueryVariables,
      sourceT<{ data: CollectionsQuery }>
    >({
      executeQuery: () => {
        return fromValue({
          data: {
            collections: _testCollections,
          },
        });
      },
    });
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedDataProvider>
          <MyNotesContent />
        </SelectedDataProvider>
      </Provider>
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
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedDataProvider>
          <MyNotesContent />
        </SelectedDataProvider>
      </Provider>
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
    // Local storage.
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
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
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedDataProvider>
          <MyNotesContent />
        </SelectedDataProvider>
      </Provider>
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
    // Local storage.
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
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
          <MyNotesContent />
        </SelectedDataProvider>
      </Provider>
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
    // Local storage.
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
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
          <MyNotesContent />
        </SelectedDataProvider>
      </Provider>
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
