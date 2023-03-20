import { ComponentMeta, ComponentStory } from "@storybook/react";
import NewItemInput, { Props } from "./NewItemInput";
import { mockNewItemInputProps } from "./NewItemInput.mocks";

export default {
  title: "templates/base/BaseTemplate",
  component: NewItemInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NewItemInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NewItemInput> = (args) => (
  <NewItemInput {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockNewItemInputProps.base,
} as Props;
