import { render, screen } from "@testing-library/react";
import { LocalStorageProvider } from "../../../../../contexts/LocalStorageContext";
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
      <LocalStorageProvider storageKey={LocalStorageKeys.SELECTED_COLLECTION}>
        <Lists />
      </LocalStorageProvider>
    );

    const listPanelHeader = screen.getByText(/collection 1/i);
    const listInList = screen.getByText(/list 1/i);

    expect(listPanelHeader).toBeInTheDocument();
    expect(listInList).toBeInTheDocument();
  });
});
