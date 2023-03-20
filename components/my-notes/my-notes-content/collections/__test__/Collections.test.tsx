import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { mockClient } from "../../../../../test-utils/mocks/gql-mocks";
import {
  testCollections,
  _testCollections,
} from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import Collections from "../Collections";

describe("Collections tests", () => {
  test("Displays the list of collections", () => {
    // Local storage.
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
    );
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <Collections />
        </SelectedDataProvider>
      </Provider>
    );

    const collections = screen.getAllByRole("heading", { name: /collection/i });
    const collectionInList = collections.filter(
      (c, i) => c.id === `collection-heading-${i + 1}`
    );

    expect(collectionInList).toHaveLength(3);
  });

  test("Selects a collection that is stored in local storage", async () => {
    // Local storage.
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <Collections />
        </SelectedDataProvider>
      </Provider>
    );

    const title = "Collection 1";

    const collectionInList = screen.getByText(title);

    await act(async () => {
      fireEvent.click(collectionInList);
    });

    const collectionInStorage = localStorage.getItem(
      LocalStorageKeys.SELECTED_COLLECTION
    );
    const collection = JSON.parse(collectionInStorage || "{}");

    expect(collection).not.toBeNull();
    expect(JSON.parse(collection).title).toBe(title);
  });

  test("adds a new collection successfully.", async () => {
    // Render
    render(
      <Provider
        value={
          mockClient({ collection: { create: "success" } }) as unknown as Client
        }
      >
        <SelectedDataProvider>
          <Collections />
        </SelectedDataProvider>
      </Provider>
    );

    const addCollectionButton = screen.getByLabelText(/add-collection/i);
    await act(async () => {
      fireEvent.click(addCollectionButton);
    });
    const input = screen.getByPlaceholderText(/title/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: "Collection 4" } });
    });
    const createCollectionButton = screen.getByLabelText(/create-collection/i);
    await act(async () => {
      fireEvent.click(createCollectionButton);
    });
    const newCollection = screen.getByRole("heading", {
      name: /Collection 4/i,
    });

    expect(newCollection).toBeInTheDocument();
  });

  test("fails to add a new collection", async () => {
    // Render
    render(
      <Provider
        value={
          mockClient({ collection: { create: "error" } }) as unknown as Client
        }
      >
        <SelectedDataProvider>
          <Collections />
        </SelectedDataProvider>
      </Provider>
    );

    const addCollectionButton = screen.getByLabelText(/add-collection/i);
    await act(async () => {
      fireEvent.click(addCollectionButton);
    });
    const input = screen.getByPlaceholderText(/title/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
    });
    const createCollectionButton = screen.getByLabelText(/create-collection/i);
    await act(async () => {
      fireEvent.click(createCollectionButton);
    });

    expect(createCollectionButton).toBeInTheDocument();
  });
});
