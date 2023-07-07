import { Collection } from "../../../../../generated/graphql";
import { _testCollections } from "../../../../../test-utils/testData";
import { Props } from "./CollectionList";

const base: Props = {
  collections: _testCollections as Collection[],
};

export const mockBaseTemplateProps = {
  base,
};
