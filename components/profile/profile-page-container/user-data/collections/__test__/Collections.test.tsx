import { render } from "@testing-library/react";
import { Collection, User } from "../../../../../../generated/graphql";
import {
  testUser,
  _testCollections,
} from "../../../../../../test-utils/testData";
import SelectedDataProvider from "../../../../../helper/SelectedDataProvider";
import Collections from "../Collections";

describe("Collections component", () => {
  test("Displays the given children", () => {
    render(
      <SelectedDataProvider>
        <Collections
          userCollectionsData={_testCollections as Collection[]}
          userData={testUser as unknown as User}
          meData={testUser as unknown as User}
        />
      </SelectedDataProvider>
    );
  });
});
