import { render } from "@testing-library/react";
import { Collection } from "../../../../../../generated/graphql";
import { _testCollections } from "../../../../../../test-utils/testData";
import SelectedDataProvider from "../../../../../helper/SelectedDataProvider";
import CollectionList from "../CollectionList";

describe("CollectionList component", () => {
  test("Displays the CollectionList component", () => {
    const collections = _testCollections as Collection[];
    render(
      <SelectedDataProvider>
        <CollectionList collections={collections} />
      </SelectedDataProvider>
    );
  });
});
