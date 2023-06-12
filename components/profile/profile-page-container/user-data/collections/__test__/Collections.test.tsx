import { render } from "@testing-library/react";
import { Collection } from "../../../../../../generated/graphql";
import { _testCollections } from "../../../../../../test-utils/testData";
import Collections from "../Collections";

describe("Collections component", () => {
  test("Displays the given children", () => {
    render(
      <Collections userCollectionsData={_testCollections as Collection[]} />
    );
  });
});
