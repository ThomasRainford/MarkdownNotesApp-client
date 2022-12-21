import { render } from "@testing-library/react";
import { LocalStorageProvider } from "../../../../contexts/LocalStorageContext";
import CollectionView from "../CollectionView";

test("Displays CollectionView", () => {
  render(
    <LocalStorageProvider storageKey="selectedCollection">
      <CollectionView />
    </LocalStorageProvider>
  );
});
