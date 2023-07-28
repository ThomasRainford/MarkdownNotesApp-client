import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Collection } from "../../../../generated/graphql";
import { _testCollections } from "../../../../test-utils/testData";
import Collections from "./Collections";
import { mockCollectionsProps } from "./Collections.mocks";

export default {
  title: "my-notes/my-notes-content/collections/Collections",
  component: Collections,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Collections>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Collections> = () => (
  <Collections
    isMe={true}
    userCollectionsData={_testCollections as Collection[]}
  />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCollectionsProps.base,
};
