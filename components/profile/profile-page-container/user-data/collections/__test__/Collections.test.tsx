import { render } from "@testing-library/react";
import { Collection } from "../../../../../../generated/graphql";
import { _testCollections } from "../../../../../../test-utils/testData";
import SelectedDataProvider from "../../../../../helper/SelectedDataProvider";
import Collections from "../Collections";

describe("Collections component", () => {
  test("Displays the given children", () => {
    render(
      <SelectedDataProvider>
        <Collections
          userCollectionsData={_testCollections as Collection[]}
          isMe={true}
        />
      </SelectedDataProvider>
    );
  });
});
