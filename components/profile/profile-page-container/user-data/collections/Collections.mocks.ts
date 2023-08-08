import { Collection, User } from "../../../../../generated/graphql";
import { testUser, _testCollections } from "../../../../../test-utils/testData";
import { Props } from "./Collections";

const base: Props = {
  userCollectionsData: _testCollections as Collection[],
  userData: testUser as unknown as User,
  meData: testUser as unknown as User,
};

export const mockCollectionsProps = {
  base,
};
