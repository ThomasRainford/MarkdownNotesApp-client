import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Collection } from "../../../../generated/graphql";
import { _testCollections } from "../../../../test-utils/testData";
import LeftPaneContent from "./LeftPaneContent";
import { mockCollectionsProps } from "./LeftPaneContent.mocks";

export default {
  title: "my-notes/my-notes-content/left-pane-content/LeftPaneContent",
  component: LeftPaneContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof LeftPaneContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LeftPaneContent> = () => (
  <LeftPaneContent
    isMe={true}
    userCollectionsData={_testCollections as Collection[]}
  />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCollectionsProps.base,
};
