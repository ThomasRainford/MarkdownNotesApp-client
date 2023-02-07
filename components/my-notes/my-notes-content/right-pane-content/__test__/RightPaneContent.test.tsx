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
import RightPaneContent from "../RightPaneContent";

describe("RightPaneContent component", () => {
  beforeAll(() => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
    );
  });

  test("Displays Lists", () => {
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
