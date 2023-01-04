import { ComponentMeta, ComponentStory } from "@storybook/react";
import ListsPane from "./ListsPane";
import { mockListsProps } from "./ListsPane.mocks";

export default {
  title: "my-notes/collection-view/ListsPane",
  component: ListsPane,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ListsPane>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ListsPane> = () => <ListsPane />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockListsProps.base,
};
