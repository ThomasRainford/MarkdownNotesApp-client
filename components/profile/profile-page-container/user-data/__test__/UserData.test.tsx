import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { Collection, User } from "../../../../../generated/graphql";
import {
  testUsers,
  _testCollections,
} from "../../../../../test-utils/testData";
import UserData from "../UserData";

describe("UserData component", () => {
  test("Displays the given children", () => {
    const user = testUsers[0] as User;
    const userCollections = _testCollections as Collection[];
    render(
      <ChakraProvider>
        <UserData userData={user} userCollectionsData={userCollections} />
      </ChakraProvider>
    );
  });
});
