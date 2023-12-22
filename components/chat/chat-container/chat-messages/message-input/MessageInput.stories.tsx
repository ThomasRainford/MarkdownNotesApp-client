import { ComponentMeta, ComponentStory } from "@storybook/react";
import MessageInput, { Props } from "./MessageInput";
import { mockMessageInputProps } from "./MessageInput.mocks";

export default {
  title: "templates/base/BaseTemplate",
  component: MessageInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MessageInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MessageInput> = (args) => (
  <MessageInput {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockMessageInputProps.base,
} as Props;
