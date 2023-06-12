import { Collection } from "../../../../../generated/graphql";
import { _testCollections } from "../../../../../test-utils/testData";
import { Props } from "./Collections";

const base: Props = {
  userCollectionsData: _testCollections as Collection[],
};

export const mockCollectionsProps = {
  base,
};
