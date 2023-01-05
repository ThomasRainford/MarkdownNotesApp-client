import { ComponentMeta, ComponentStory } from "@storybook/react";
import RightPaneContent from "./RightPaneContent";
import { mockListsProps } from "./RightPaneContent.mocks";

export default {
  title: "my-notes/collection-view/RightPaneContent",
  component: RightPaneContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof RightPaneContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RightPaneContent> = () => (
  <RightPaneContent />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockListsProps.base,
};
