import { ComponentMeta, ComponentStory } from "@storybook/react";
import AddOrCancelAddItem, { Props } from "./AddOrCancelAddItem";
import { mockAddOrCancelAddItemProps } from "./AddOrCancelAddItem.mocks";

export default {
  title: "my-notes/add-or-cancel-add-item/AddOrCancelAddItem",
  component: AddOrCancelAddItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AddOrCancelAddItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddOrCancelAddItem> = (args) => (
  <AddOrCancelAddItem {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockAddOrCancelAddItemProps.base,
} as Props;
