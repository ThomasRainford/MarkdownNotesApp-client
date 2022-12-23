import { render, screen } from "@testing-library/react";
import { SelectedCollectionProvider } from "../../../../../contexts/SelectedCollectionContext";
import { testCollections } from "../../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../../utils/types/types";
import Lists from "../Lists";

describe("Lists component", () => {
  test("Displays Lists", () => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_COLLECTION,
      JSON.stringify(testCollections[0])
    );
    render(
      <SelectedCollectionProvider>
        <Lists />
      </SelectedCollectionProvider>
    );

    const listPanelHeader = screen.getByText(/collection 1/i);
    const listInList = screen.getByText(/list 1/i);

    expect(listPanelHeader).toBeInTheDocument();
    expect(listInList).toBeInTheDocument();
  });
});
