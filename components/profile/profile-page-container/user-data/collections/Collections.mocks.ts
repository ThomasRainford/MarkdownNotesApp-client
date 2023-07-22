import { Collection } from "../../../../../generated/graphql";
import { _testCollections } from "../../../../../test-utils/testData";
import { Props } from "./Collections";

const base: Props = {
  userCollectionsData: _testCollections as Collection[],
  isMe: true,
};

export const mockCollectionsProps = {
  base,
};
