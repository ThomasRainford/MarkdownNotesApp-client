import { Collection, User } from "../../../../generated/graphql";
import { testUsers, _testCollections } from "../../../../test-utils/testData";
import { Props } from "./UserData";

const base: Props = {
  userData: testUsers[0] as User,
  userCollectionsData: _testCollections as Collection[],
  followingData: [],
  followersData: [],
  meData: testUsers[0] as User,
};

export const mockUserDataProps = {
  base,
};
