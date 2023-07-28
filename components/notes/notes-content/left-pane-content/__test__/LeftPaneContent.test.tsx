import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { MyNotesSmallDesktopViewPaneVisibleProvider } from "../../../../../contexts/MyNotesSmallDesktopViewPaneVisibleContext";
import { Collection } from "../../../../../generated/graphql";
import { mockClient } from "../../../../../test-utils/mocks/gql-mocks";
import {
  testNotesLists,
  _testCollections,
} from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import LeftPaneContent from "../LeftPaneContent";

describe("LeftPaneContent component", () => {
  test("Displays Collections", () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify({ id: "1" })
    );
    localStorage.setItem(LocalStorageKeys.SELECTED_LIST, "");
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <MyNotesSmallDesktopViewPaneVisibleProvider>
            <LeftPaneContent
              isMe={true}
              userCollectionsData={_testCollections as Collection[]}
            />
          </MyNotesSmallDesktopViewPaneVisibleProvider>
        </SelectedDataProvider>
      </Provider>
    );

    const leftPaneContentlHeader = screen.getByText(/collections/i);

    expect(leftPaneContentlHeader).toBeInTheDocument();
  });

  test("Displays the list of collections", () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify({ id: "1" })
    );
    localStorage.setItem(LocalStorageKeys.SELECTED_LIST, "");
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <MyNotesSmallDesktopViewPaneVisibleProvider>
            <LeftPaneContent
              isMe={true}
              userCollectionsData={_testCollections as Collection[]}
            />
          </MyNotesSmallDesktopViewPaneVisibleProvider>
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
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <MyNotesSmallDesktopViewPaneVisibleProvider>
            <LeftPaneContent
              isMe={true}
              userCollectionsData={_testCollections as Collection[]}
            />
          </MyNotesSmallDesktopViewPaneVisibleProvider>
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
    expect(JSON.parse(collection).id).toBe("1");
  });

  test("Selecting a list displays the lists in the right pane", async () => {
    // Local storage
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(_testCollections[0])
    );
    localStorage.setItem(
      LocalStorageKeys.SELECTED_LIST,
      JSON.stringify(testNotesLists.collection1[0])
    );
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <MyNotesSmallDesktopViewPaneVisibleProvider>
            <LeftPaneContent
              isMe={true}
              userCollectionsData={_testCollections as Collection[]}
            />
          </MyNotesSmallDesktopViewPaneVisibleProvider>
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
