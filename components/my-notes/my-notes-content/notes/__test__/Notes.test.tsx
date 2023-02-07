import { render, screen } from "@testing-library/react";
import { Client, Provider } from "urql";
import { fromValue } from "wonka";
import { sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import {
  NotesListQuery,
  NotesListQueryVariables,
} from "../../../../../generated/graphql";
import { createMockUrqlClient } from "../../../../../test-utils/createMockUrqlClient";
import {
  testCollections,
  testNotesLists,
} from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import Notes from "../Notes";

describe("Notes component", () => {
  test("Displays Notes", () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify(testCollections[0].lists[0])
    );
    // Mock URQL client.
    const mockClient = createMockUrqlClient<
      NotesListQueryVariables,
      sourceT<{ data: NotesListQuery }>
    >({
      executeQuery: () => {
        return fromValue({
          data: {
            notesList: testNotesLists.collection1[0],
          },
        });
      },
    });
    render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedDataProvider>
          <Notes />
        </SelectedDataProvider>
      </Provider>
    );

    const note = screen.getByText(/note 1/i);

    expect(note).toBeInTheDocument();
  });
});
