import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { Collection, User } from "../../../../../generated/graphql";
import {
  testUsers,
  _testCollections,
} from "../../../../../test-utils/testData";
import SelectedDataProvider from "../../../../helper/SelectedDataProvider";
import UserData from "../UserData";

describe("UserData component", () => {
  test("Displays the given children", () => {
    const user = testUsers[0] as User;
    const me = testUsers[1] as User;
    const userCollections = _testCollections as Collection[];
    render(
      <ChakraProvider>
        <SelectedDataProvider>
          <UserData
            meData={me}
            userData={user}
            userCollectionsData={userCollections}
            followingData={[]}
            followersData={[]}
            votesData={[]}
          />
        </SelectedDataProvider>
      </ChakraProvider>
    );
  });
});
