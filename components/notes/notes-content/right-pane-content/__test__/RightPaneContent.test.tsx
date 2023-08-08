import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { Collection, User } from "../../../../../generated/graphql";
import { mockClient } from "../../../../../test-utils/mocks/gql-mocks";
import { testUser, _testCollections } from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import RightPaneContent from "../RightPaneContent";

describe("RightPaneContent component", () => {
  beforeEach(() => {
    localStorage.removeItem(LocalStorageKeys.SELECTED_LIST);
    localStorage.removeItem(LocalStorageKeys.SELECTED_NOTE);
  });

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
          <RightPaneContent
            isMe={true}
            userData={testUser as unknown as User}
            userCollectionsData={_testCollections as Collection[]}
          />
        </SelectedDataProvider>
      </Provider>
    );

    const rightPaneContentHeader = screen.getByText(/collection 1/i);
    const listInList = screen.getByText(/list 1/i);

    expect(rightPaneContentHeader).toBeInTheDocument();
    expect(listInList).toBeInTheDocument();
  });

  test("Selects a list that is then stored in local storage", async () => {
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <RightPaneContent
            isMe={true}
            userData={testUser as unknown as User}
            userCollectionsData={_testCollections as Collection[]}
          />
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
    expect(JSON.parse(list).id).toBe("1");
  });

  test("Selecting a list displays the lists notes", async () => {
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <RightPaneContent
            isMe={true}
            userData={testUser as unknown as User}
            userCollectionsData={_testCollections as Collection[]}
          />
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

  test("Update collection title", async () => {
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <RightPaneContent
            isMe={true}
            userData={testUser as unknown as User}
            userCollectionsData={_testCollections as Collection[]}
          />
        </SelectedDataProvider>
      </Provider>
    );
    const rightPaneContentHeader = screen.getByText(/collection 1/i);
    expect(rightPaneContentHeader).toBeInTheDocument();
    // Open input
    await act(async () => {
      fireEvent.doubleClick(rightPaneContentHeader);
    });
    // Edit collection title
    const newCollectionTitle = /collection 1 updated/i;
    const collectionInput = screen.getByDisplayValue(/collection 1/i);
    fireEvent.change(collectionInput, {
      target: { value: newCollectionTitle },
    });
    const confirmEditButton = screen.getByLabelText("update-collection-title");
    await act(async () => {
      fireEvent.click(confirmEditButton);
    });
    // Assert new collection title
    const newRightPaneContentHeader = screen.getByText(newCollectionTitle);
    expect(newRightPaneContentHeader).toBeInTheDocument();
  });

  test("Update list title", async () => {
    // Render
    render(
      <Provider value={mockClient() as unknown as Client}>
        <SelectedDataProvider>
          <RightPaneContent
            isMe={true}
            userData={testUser as unknown as User}
            userCollectionsData={_testCollections as Collection[]}
          />
        </SelectedDataProvider>
      </Provider>
    );

    const title = "List 1";
    const listList = screen.getByText(title);
    await act(async () => {
      fireEvent.click(listList);
    });
    // Assert current list title.
    const rightPaneContentHeader = screen.getByText(/list 1/i);
    expect(rightPaneContentHeader).toBeInTheDocument();
    // Open input
    await act(async () => {
      fireEvent.doubleClick(rightPaneContentHeader);
    });
    // Edit list title
    const newListTitle = /list 1 updated/i;
    const listInput = screen.getByDisplayValue(/list 1/i);
    fireEvent.change(listInput, {
      target: { value: newListTitle },
    });
    const confirmEditButton = screen.getByLabelText("update-list-title");
    await act(async () => {
      fireEvent.click(confirmEditButton);
    });
    // Assert new list title
    const newRightPaneContentHeader = screen.getByText(newListTitle);
    expect(newRightPaneContentHeader).toBeInTheDocument();
  });
});
