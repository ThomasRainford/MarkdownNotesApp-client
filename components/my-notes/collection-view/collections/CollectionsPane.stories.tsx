import { ComponentMeta, ComponentStory } from "@storybook/react";
import CollectionsPane from "./CollectionsPane";
import { mockCollectionsProps } from "./CollectionsPane.mocks";

export default {
  title: "my-notes/collection-view/Collections",
  component: CollectionsPane,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CollectionsPane>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CollectionsPane> = () => (
  <CollectionsPane />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCollectionsProps.base,
};
